const {MessageEmbed}=require("discord.js");
const fs=require("fs");

module.exports={
    data:{
        name:"men",
        description:"チーム振り分けコマンド",
        default_permission:true,
        options:[
            {
                type:4,
                name:"number",
                description: "１チーム当たりの人数を入力してください。",
                required:true
            },
            {
                type:3,
                name:"channelid",
                description: "振り分けたいチャンネルIDを入力してください。",
                required: true
            }
        ]
    },
    execute(interaction,client){
        const number=interaction.options.getInteger("number");
        const channelid=interaction.options.getString("channelid");
        const targetchannel=interaction.guild.channels.cache.get(channelid);
        if(targetchannel===undefined||targetchannel===null){
            const embed=new MessageEmbed()
                .setTitle("チャンネルが見つかりません")
                .setColor("RED")
                .setDescription("指定したチャンネルは見つかりませんでした。");
            interaction.reply({embeds:embed});
            return;
        }
        const users=Array.from(targetchannel.members.keys());
        var keys=[...Array(users.length).keys()];
        keys=shuffle(keys);
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
                .setTitle("チーム分け完了")
                .setColor("GREEN")
                .setDescription(`[${targetchannel.name}]に参加しているユーザーを${number}人ずつに割り振りました。`);

            var key=0;

            for(var i=1;i<21;i++){
                var list="";
                if(configdata.teamlist["team"+i].length===0){
                    for(var j=0;j<number;j++){
                        if(keys.length>key){
                            var member=interaction.guild.members.cache.get(users[keys[key]]);
                            list+=member.user.tag+"\n";
                            key++;
                        }
                    }
                    if(list!==""){
                        embed.addField(`チーム${String(i)}`,list);
                    }
                }
            }

            if(keys.length>key){
                list="";
                for(var i=key;i<keys.length;i++){
                    var member=interaction.guild.members.cache.get(users[keys[key]]);
                    list+="　　"+member.user.tag+"\n";
                }
                embed.addField("余り",`${list}`);
            }
            interaction.reply({embeds:[embed]});
            return;
        })
    }
};

const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}