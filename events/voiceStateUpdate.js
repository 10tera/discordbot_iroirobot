const fs=require("fs");
const {kikisenID} = require('../config.json');

module.exports = {
    name:"voiceStateUpdate",
    async execute(oldState,newState,client){
        try{
            const oldchannel=oldState.channel;
            const newchannel=newState.channel;

            //移動元に関わらずチャンネル入室時処理
            if(newchannel!==null){
                //bot参加時に制限人数を1増やす
                const user_limit=newchannel.userLimit;
                if(newState.member.user.bot&&user_limit!==0){
                    await newchannel.setUserLimit(user_limit+1);
                }
                fs.readFile("config.json",{encoding:"utf-8"},(err,file)=>{
                    if(err){
                        console.error(err.message);
                    }
                    else{
                        const configdata=JSON.parse(file);
                        //設定されたチャンネルかどうかの判断
                        let isnewchannel=false;
                        let newnamebase;
                        let vclimit;
                        let to_vc_id;
                        for(const val of configdata.vclist){
                            if(val[0]===newchannel.id){
                                isnewchannel=true;
                                newnamebase=val[1];
                                vclimit=val[2];
                                to_vc_id=val[3];
                                break;
                            }
                        }
                        if(isnewchannel!==false){
                            const allchannels=newchannel.guild.channels.cache.filter(c=>c.type==="GUILD_VOICE"&&String(c.parentId)===to_vc_id&&c.id!==newchannel.id);
                            let numbers=[];
                            allchannels.forEach((value,key)=>{
                                const number=value.name.replace(newnamebase+"-","");
                                if(number!==""&&!(isNaN(number))){
                                    numbers.push(Number(number));
                                }
                            });
                            numbers.sort((a,b)=>{
                                return(a<b?-1:1);
                            });
                            let newnumber;
                            let handan=false;
                            if(numbers.length===0){
                                newnumber=1;
                                handan=true;
                            }
                            else{
                                newnumber=0;
                                for(const val of numbers){
                                    if(val===newnumber+1){
                                        newnumber++;
                                    }
                                    else{
                                        newnumber++;
                                        handan=true;
                                        break;
                                    }
                                }
                            }
                            if(handan===false){
                                newnumber++;
                            }
                            let newname=newnamebase+"-"+String(newnumber);
                            newchannel.guild.channels
                                .create(newname,{type:"GUILD_VOICE",parent:to_vc_id,userLimit:Number(vclimit)})
                                .then((channel)=>{
                                    const mem=newState.member;
                                    mem.edit({channel:channel.id});
                                })
                                .catch(console.error);
                            newchannel.guild.channels
                                .create("聞き専-"+newname,{type:"GUILD_TEXT",parent:kikisenID})
                                .catch(console.error);

                        }
                    }
                });
            }
            //移動先に関わらずチャンネル退出時処理
            if(oldchannel!==null){
                fs.readFile("config.json",{encoding: "utf-8"},(err,file)=>{
                    if(err){
                        console.error(err.message);
                    }
                    else{
                        const configdata=JSON.parse(file);
                        for(const val of configdata.vclist){
                            if(val[3]===oldchannel.parentId){
                                if(oldchannel.members.size==0){
                                    const oldchannelname=oldchannel.name;
                                    oldchannel.delete();
                                    const kikisenchannel=oldchannel.guild.channels.cache
                                        .filter((c)=>c.type==="GUILD_TEXT"&&String(c.parentId)===kikisenID&&c.name==="聞き専-"+oldchannelname);

                                    if(kikisenchannel!==null&&kikisenchannel!==undefined){
                                        kikisenchannel.forEach((channel)=>{
                                            channel.delete();
                                        });
                                    }
                                    return;
                                }
                            }
                        }
                    }
                });
            }
        }
        catch (e){
            console.error(e);
        }
    }
}
