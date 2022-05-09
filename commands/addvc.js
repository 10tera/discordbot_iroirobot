const {MessageEmbed}=require("discord.js");
const fs=require("fs");

module.exports = {
    data : {
        name:"addvc",
        description:"自動VC作成コマンド",
        default_permission:false,
        options:[
            {
                type: 3,
                name: 'channelid',
                description: 'VC作成チャンネルのチャンネルIDを入力してください',
                required: true
            },
            {
                type: 3,
                name: 'vcname',
                description: '作られるVCの名前を入力してください',
                required: true
            },
            {
                type: 4,
                name: 'number',
                description: '作成されるVCの人数制限数を入力してください',
                required: true
            },
            {
                type: 3,
                name: 'categoryid',
                description: 'VCが作成される先のカテゴリIDを入力してください',
                required: true
            }
        ]
    },
    execute(interaction,client){
        const channelid=interaction.options.getString("channelid");
        const vcname=interaction.options.getString("vcname");
        const number=String(interaction.options.getInteger("number"));
        const categoryid=interaction.options.getString("categoryid");
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
            var configdata=JSON.parse(file);
            configdata.vclist[configdata.vclist.length]=[channelid,vcname,number,categoryid];
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
                try{
                    var channelname=interaction.guild.channels.cache.get(channelid).name;
                }catch (e){
                    console.log(e.message);
                    channelname="undefined";
                }
                try {
                    var categoryname=interaction.guild.channels.cache.get(categoryid).name;
                }catch (e) {
                    console.log(e.message);
                    categoryname="undefined";
                }

                const embed=new MessageEmbed()
                    .setTitle("VCの追加完了")
                    .setColor("GREEN")
                    .setDescription(`VC作成チャンネル：${channelname}\n` +
                        `VCの名前：${vcname}\n`+
                        `VCの制限人数：${number}\n` +
                        `作られる先のカテゴリー：${categoryname}\n` +
                        "を設定に追加しました。");
                interaction.reply({embeds:[embed]});
            });
        });
    }
};