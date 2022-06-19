const {MessageEmbed}=require("discord.js");
const fs =  require('fs');

module.exports = {
    data : {
        name:"lottery",
        description:"指定されたランクの中から抽選します",
        default_permission:false,
        options:[]
    },
    execute(interaction,client){
        fs.readFile("config.json",{encoding:"utf-8"},async (err, file) => {
            if (err) {
                console.error(err)
                const embed = new MessageEmbed()
                    .setTitle("ファイルエラー")
                    .setColor("RED")
                    .setDescription("config.jsonを開けませんでした。\nよっぽどこんなエラー起きませんが念のため例外処理しておきます。\n起きたら制作者へ連絡してください。");
                interaction.reply({embeds: [embed]});
                return false;
            }
            await interaction.deferReply();
            const configdata = JSON.parse(file);
            const roledatas = configdata.lottery_role;

            let member_number = new Map();
            let member_data = [[],[],[],[]];
            let data = new Map();
            for(let roledata of roledatas){
                member_number.set(roledata[0],0);
            }
            await interaction.guild.members.fetch()
                .then(members => Promise.all(members.map(member =>{
                    if(!member.user.bot){
                        let hasrole = false;
                        let roleid="";
                        let roleindex=0;
                        let role_mag=0;
                        member.roles.cache.forEach(role => {
                            let i=0;
                            for(let roledata of roledatas){
                                if(roledata[0]===role.id){
                                    hasrole=true;
                                    if(role_mag<Number(roledata[1])){
                                        role_mag=Number(roledata[1]);
                                        roleid=roledata[0];
                                        roleindex=i;
                                    }
                                }
                                i++;
                            }
                        });
                        if(hasrole){
                            member_number.set(roleid,member_number.get(roleid)+1);
                            member_data[roleindex].push(member.user.tag);
                        }
                    }
                })))
                .catch(console.error);
            let totalweight=0;
            for(let roledata of roledatas){
                data.set(roledata[0],Number(roledata[1])*member_number.get(roledata[0]));
                totalweight+=data.get(roledata[0]);
            }
            console.log(member_number);
            console.log(member_data);
            console.log(data);
            let rnd = Math.floor(Math.random()*totalweight);
            let pick=0;
            let i=0;
            for(let roledata of roledatas){
                if(rnd<data.get(roledata[0])){
                    pick=i;
                    break;
                }
                rnd-=data.get(roledata[0]);
                i++;
            }
            rnd= Math.floor(Math.random()*member_number.get(roledatas[pick][0]));
            await interaction.editReply("当選者は..."+member_data[pick][rnd]+"です");
        });
    }
};