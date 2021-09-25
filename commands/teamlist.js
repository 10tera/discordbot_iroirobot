const {MessageEmbed}=require("discord.js");
const fs=require("fs");

module.exports = {
    data:{
        name:"teamlist",
        description:"固定チームリストを表示",
        default_permission:true,
        options:[]
    },
    execute(interaction,client){
        fs.readFile("config.json",{encoding:"utf-8"},(err,file)=>{
            if(err){
                console.error(err);
                const embed=new MessageEmbed()
                    .setTitle("ファイルエラー")
                    .setColor("RED")
                    .setDescription("config.jsonを開けませんでした。\nよっぽどこんなエラー起きませんが念のため例外処理しておきます。\n起きたら制作者へ連絡してください。");
                interaction.reply({embeds:[embed]});
                return;
            }
            const configdata=JSON.parse(file);
            var embed=new MessageEmbed()
                .setTitle("固定チーム一覧")
                .setColor("GREEN")
                .setDescription("固定チームのリストです");
            var list="";
            for(var i=1;i<21;i++){
                list="";
                for(var j=0;j<configdata.teamlist["team"+i].length;j++){
                    const member=interaction.guild.members.cache.get(configdata.teamlist["team"+i][j]);
                    if(member===undefined||member===null){
                        list+="Undefined\n";
                    }
                    else{
                        list+=member.user.tag+"\n";
                    }
                }
                if(list!=="")embed.addField(`チーム${i}`,list);
            }
            interaction.reply({embeds:[embed]});
            return;
        })
    }
};