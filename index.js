const {Client,Collection,Intents,MessageEmbed} = require('discord.js');
const {token,logID,guildID} = require('./config.json');
const fs = require('fs');
const client = new Client({intents:[Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_VOICE_STATES]});

client.commands=new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
   const command = require(`./commands/${file}`);
   client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
   const event = require(`./events/${file}`);
   if (event.once) {
      client.once(event.name, (...args) => event.execute(...args,client));
   } else {
      client.on(event.name, (...args) => event.execute(...args,client));
   }
}


process.on('uncaughtException', function(err) {
   //console.error(err);
   const logchannel=client.guilds.cache.get(guildID).channels.cache.get(logID);
   if(logchannel===undefined||logchannel===null){
      console.log("ログチャンネルが存在しない");
      return;
   }
   logchannel.send("botが数秒後に停止します。再起動してください。");
   const embed=new MessageEmbed()
       .setTitle("botにて未知のエラー発生")
       .setColor("RED")
       .setDescription(`${err.stack}`);
   try {
      logchannel.send({embeds:[embed]});
   }
   catch (e) {
      console.error(e);
   }

});



client.login(token);