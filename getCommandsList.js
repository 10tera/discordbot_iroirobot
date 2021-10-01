const request = require('request');

const applictionid="808587584447971328";
const guildid="731458829774225448";
const {token}=require("./config.json");

var options={
    url:"https://discord.com/api/v8/applications/"+applictionid+"/guilds/"+guildid+"/commands",
    method:"GET",
    headers:{"Authorization": `Bot ${token}`}
}

request(options,function(err,responce,body){
    console.log(JSON.parse(body));
});