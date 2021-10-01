const {MessageEmbed}=require("discord.js");
const fs=require("fs");

module.exports={
    data:{
        name:"deletevc",
        description:"VC設定削除コマンド",
        default_permission:true,
        options:[
            {
                type:4,
                name:"index",
                description: "/vclistで表示される任意の削除したいデータのインデックスを入力してください。",
                required:true
            }
        ]
    },
    execute(interaction,client){
        const index=interaction.options.getInteger("index");
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
            if(index<1){
                const embed=new MessageEmbed()
                    .setTitle("引数エラー")
                    .setColor("RED")
                    .setDescription("引数に１より小さい値が入力されました。");
                interaction.reply({embeds:[embed]});
                return;
            }
            var configdata=JSON.parse(file);
            configdata.vclist.splice(index-1,1);
            const configtext=JSON.stringify(configdata,undefined,4);
            fs.writeFile("config.json",configtext,{encoding: 'utf-8'},(err2)=>{
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
                    .setTitle("VC設定削除完了")
                    .setColor("GREEN")
                    .setDescription(`インデックス番号${String(index)}のデータ削除が完了しました。`);
                interaction.reply({embeds:[embed]});
            });
        });
    }
};