const {MessageEmbed}=require("discord.js");
const fs=require("fs");

module.exports = {
    data : {
        name:"vclist",
        description:"設定された自動VC作成機能のリストを表示します。",
        default_permission:false,
        options:[]
    },
    execute(interaction,client){
        fs.readFile("config.json",{encoding:"utf-8"},(err,file)=>{
            if(err){
                console.error(err)
                const embed=new MessageEmbed()
                    .setTitle("ファイルエラー")
                    .setColor("RED")
                    .setDescription("config.jsonを開けませんでした。\nよっぽどこんなエラー起きませんが念のため例外処理しておきます。\n起きたら制作者へ連絡してください。");
                interaction.reply({embeds:[embed]});
                return;
            }
            const configdata=JSON.parse(file);
            var embed=new MessageEmbed()
                .setTitle("VCリスト")
                .setColor("GREEN")
                .setDescription("上から順に[VC作成チャンネル：VC名：VCの制限人数：作られる先のカテゴリー]");
            var index=0;
            for(const val of configdata.vclist){
                index++;
                try{
                    var channelname=interaction.guild.channels.cache.get(val[0]).name;
                }catch (e){
                    console.log(e.message);
                    channelname="undefined";
                }
                try {
                    var categoryname=interaction.guild.channels.cache.get(val[3]).name;
                }catch (e) {
                    console.log(e.message);
                    categoryname="undefined";
                }
                embed.addField(`<${String(index)}>`,`${channelname}\n${val[1]}\n${val[2]}\n${categoryname}`);
            }
            interaction.reply({embeds:[embed]});
        })
    }
};