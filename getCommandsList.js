const request = require('request');

const applictionid="780729687777083404";
const guildid="780616269824655421";
const {token}=require("./config.json");

var options={
    url:"https://discord.com/api/v8/applications/"+applictionid+"/guilds/"+guildid+"/commands",
    method:"GET",
    headers:{"Authorization": `Bot ${token}`}
}

request(options,function(err,responce,body){
    console.log(JSON.parse(body));
});