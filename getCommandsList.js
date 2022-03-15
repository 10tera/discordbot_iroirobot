const request = require('request');
const {token,applicationID,guildID} = require('./config.json');


var options={
    url:"https://discord.com/api/v8/applications/"+applicationID+"/guilds/"+guildID+"/commands",
    method:"GET",
    headers:{"Authorization": `Bot ${token}`}
}

request(options,function(err,responce,body){
    console.log(JSON.parse(body));
});