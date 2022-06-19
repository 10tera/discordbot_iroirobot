const {MessageEmbed}=require("discord.js");
const fs =  require('fs');

module.exports = {
    data : {
        name:"prob",
        description:"抽選システムのロール編集",
        default_permission:false,
        options:[
            {
                type: 3,
                name: 'roleid',
                description: '編集したいロールのIDを入力してください',
                required: true
            },
            {
                type: 3,
                name: 'magnification',
                description: '倍率を入力してください',
                required: true
            }
        ]
    },
    execute(interaction,client){
        const roleid=interaction.options.getString("roleid");
        const magnification=interaction.options.getString("magnification");
        fs.readFile("config.json",{encoding:"utf-8"},(err,file)=>{
            if(err){
                console.error(err)
                const embed=new MessageEmbed()
                    .setTitle("ファイルエラー")
                    .setColor("RED")
                    .setDescription("config.jsonを開けませんでした。\nよっぽどこんなエラー起きませんが念のため例外処理しておきます。\n起きたら制作者へ連絡してください。");
                interaction.reply({embeds:[embed]});
                return false;
            }
            const configdata=JSON.parse(file);
            let isrole=false;
            let role_index=0;
            for(var roledata of configdata.lottery_role){
                if(roledata[0]===roleid){
                    isrole=true;
                    break;
                }
                role_index++;
            }
            if(!isrole){
                const embed = new MessageEmbed()
                    .setTitle("ロール情報なし")
                    .setColor("YELLOW")
                    .setDescription("指定したロールは設定に追加されていません。particコマンドで設定してください。");
                interaction.reply({embeds:[embed]});
                return true;
            }
            configdata.lottery_role[role_index][1]=magnification;
            const configtext=JSON.stringify(configdata,undefined,4);
            fs.writeFile("config.json",configtext,{encoding: 'utf-8'},(err2)=>{
                let rolename;
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
                    rolename = interaction.guild.roles.cache.get(roleid).name;
                }catch (e){
                    console.log(e.message);
                    rolename="undefined";
                }

                const embed=new MessageEmbed()
                    .setTitle("抽選ロール編集完了")
                    .setColor("GREEN")
                    .setDescription(`ロール：${rolename}\n` +
                        `倍率：${magnification}\n` +
                        "を設定に追加しました。");
                interaction.reply({embeds:[embed]});
            });
        });
    }
};