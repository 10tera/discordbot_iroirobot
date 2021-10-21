const {MessageEmbed}=require("discord.js");
const fs=require("fs");

module.exports={
    data:{
        name:"teamdeleteadmin",
        description:"管理者専用チーム申請取り消しコマンド",
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
            },
            {
                type: 3,
                name: "user",
                description: "申請を取り消したいユーザーのIDを入力してください",
                required: true
            }
        ]
    },
    execute(interaction,client){
        const team_name=interaction.options.getString("number");
        const userid=interaction.options.getString("user");

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
            if(configdata.teamlist["team"+team_name].indexOf(userid)!==-1){
                configdata.teamlist["team"+team_name].splice(configdata.teamlist["team"+team_name].indexOf(userid),1);
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
                    .setTitle("申請削除完了")
                    .setColor("GREEN")
                    .setDescription("固定チームへの申請を削除しました。");
                interaction.reply({embeds:[embed]});
                return;
            })
        });
    }
}