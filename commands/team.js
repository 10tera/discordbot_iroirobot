const {MessageEmbed}=require("discord.js");
const fs=require("fs");
const {custom_member_roleID} = require('../config.json');

module.exports = {
    data:{
        name:"team",
        description:"固定チーム申請コマンド",
        default_permission:true,
        options:[
            {
                type:3,
                name:"number",
                description: "チーム番号を入力してください。",
                required:true,
                choices:[
                    {name:"チーム1",value:"1"},
                    {name:"チーム2",value:"2"},
                    {name:"チーム3",value:"3"},
                    {name:"チーム4",value:"4"},
                    {name:"チーム5",value:"5"},
                    {name:"チーム6",value:"6"},
                    {name:"チーム7",value:"7"},
                    {name:"チーム8",value:"8"},
                    {name:"チーム9",value:"9"},
                    {name:"チーム10",value:"10"},
                    {name:"チーム11",value:"11"},
                    {name:"チーム12",value:"12"},
                    {name:"チーム13",value:"13"},
                    {name:"チーム14",value:"14"},
                    {name:"チーム15",value:"15"},
                    {name:"チーム16",value:"16"},
                    {name:"チーム17",value:"17"},
                    {name:"チーム18",value:"18"},
                    {name:"チーム19",value:"19"},
                    {name:"チーム20",value:"20"},
                ]
            }
        ]
    },
    execute(interaction,client){
        const sendmember=interaction.member;
        const team_name=interaction.options.getString("number");
        fs.readFile("./config.json",{encoding:"utf-8"},(err,file)=>{
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
            if(configdata.teamlist["team"+team_name].length>2){
                const embed=new MessageEmbed()
                    .setTitle("申請できません")
                    .setColor("BLUE")
                    .setDescription("指定したチームはすでに埋まっています。");
                interaction.reply({embeds:[embed]});
                return;
            }
            for(var i=1;i<21;i++){
                if(configdata.teamlist["team"+i].includes(interaction.user.id)){
                    const embed=new MessageEmbed()
                        .setTitle("申請できません")
                        .setColor("BLUE")
                        .setDescription("既にチーム申請を出しています。申請を削除してからお試しください。");
                    interaction.reply({embeds:[embed]});
                    return;
                }
            }
            configdata.teamlist["team"+team_name].push(interaction.user.id);
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
                if(sendmember!==null){
                    const sendmember_roles=sendmember.roles;
                    if(sendmember_roles!==null){
                        const target_role=sendmember.guild.roles.cache.find(role=>role.id===custom_member_roleID);
                        if(target_role!==null){
                            //
                            sendmember_roles.add(target_role.toString());
                        }
                    }
                }
                const embed=new MessageEmbed()
                    .setTitle("申請完了")
                    .setColor("GREEN")
                    .setDescription("申請を完了しました。");
                interaction.reply({embeds:[embed]});
            });
        });
    }
};