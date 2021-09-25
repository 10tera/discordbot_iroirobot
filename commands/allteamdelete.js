const {MessageEmbed}=require("discord.js");
const fs=require("fs");

module.exports = {
    data:{
        name:"allteamdelete",
        description:"固定チームへの申請の全削除",
        default_permission:false,
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
            var teammei="";
            for(var i=1;i<21;i++){
                teammei="team"+i;
                configdata.teamlist[teammei].splice(0);
            }
            const configtext=JSON.stringify(configdata,undefined,4);
            fs.writeFile("config.json",configtext,{encoding:"utf-8"},(err2)=>{
                if(err2){
                    console.error(err2);
                    const embed=new MessageEmbed()
                        .setTitle("ファイルエラー")
                        .setColor("RED")
                        .setDescription("config.jsonを編集出来ませんでした。\nよっぽどこんなエラー起きませんが念のため例外処理しておきます。\n起きたら制作者へ連絡してください。");
                    interaction.reply({embeds:[embed]});
                    return;
                }
                const embed=new MessageEmbed()
                    .setTitle("全削除完了")
                    .setColor("GREEN")
                    .setDescription("全ての固定チームの申請を削除しました。");
                interaction.reply({embeds:[embed]});
                return;
            })
        })
    }
};