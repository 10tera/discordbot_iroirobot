const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { clientID, guildID, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    console.log(file);
    const command = require(`./commands/${file}`);
    var commanddata;
    commanddata=command.data;
    console.log(commanddata);
    commands.push(commanddata);

}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        await rest.put(
            /*
            Routes.applicationCommands(clientID),
            {body:commands},

             */
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands},
        );

        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
})();