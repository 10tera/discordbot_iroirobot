const fs=require("fs");

module.exports = {
    name:"voiceStateUpdate",
    async execute(oldState,newState,client){
        try{
            const newChannel = newState.channel;
            const oldChannel = oldState.channel;

            if(newChannel!=null){
                if(newState.member.user.bot){
                    if(newChannel.userLimit===3){
                        await newChannel.setUserLimit(4);
                    }
                }
            }


            if(oldChannel!=null&&oldChannel!=undefined){
                fs.readFile("config.json",{encoding: "utf-8"},(err,file)=>{
                    const configdata=JSON.parse(file);
                    if(oldChannel!=null){
                        for(const val of configdata.vclist){
                            if(val[3]===oldChannel.parentId){
                                if(oldChannel.members.size==0){
                                    oldChannel.delete();
                                    return;
                                }
                            }
                        }
                    }
                });
            }
            if(newChannel!=null){
                fs.readFile("config.json",{encoding: "utf-8"},(err,file)=>{
                    if(err){
                        console.error(err.message);
                        return;
                    }
                    const configdata=JSON.parse(file);
                    var newchannelis=false;
                    for(const val of configdata.vclist){
                        if(val[0]===newChannel.id){
                            var newnamebase=val[1];
                            var vclimit=val[2];
                            var to_vc_id=val[3];
                            newchannelis=true;
                            break;
                        }
                    }
                    if(newchannelis===false){
                        return;
                    }
                    const allchannels=newChannel.guild.channels.cache.filter(c=>c.type==="GUILD_VOICE"&&String(c.parentId)===to_vc_id&&c.id!==newChannel.id);
                    let numbers=[];
                    allchannels.forEach(function(value,key){
                        const number=value.name.replace(newnamebase+"-","");
                        if(!(number==="")&&!(isNaN(number))){
                            numbers.push(Number(number));
                        }
                    });
                    numbers.sort(
                        function(a,b){
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
                    newChannel.guild.channels
                        .create(newname,{type:"GUILD_VOICE",parent:to_vc_id,userLimit:Number(vclimit)})
                        .then((channel)=>{
                            const mem=newState.member;
                            mem.edit({channel:channel.id});
                        })
                        .catch(console.error);
                });
            }
        }
        catch (e){
            console.error(e);
        }
    }
}