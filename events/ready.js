const {clientID, guildID,commandID} = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const admin_permission={
            id:"798804768453558272",
            type:"ROLE",
            permission:true
        };
        const subadmin_permission={
            id:"890774403015671818",
            type:"ROLE",
            permission: true
        };
        const commands = client.guilds.cache.get(guildID)?.commands;

        //権限関連のみ後回し
        /*
        commands.permissions.set(
            {
                command:commandID.addvc,
                permissions:[admin_permission,subadmin_permission]
            });

         */
        commands.permissions.set(
            {
                command:commandID.deletevc,
                permissions:[admin_permission,subadmin_permission]
            }
        );

        commands.permissions.set(
            {
                command:commandID.allteamdelete,
                permissions:[admin_permission,subadmin_permission]
            }
        );

        commands.permissions.set(
            {
                command:commandID.teamadmin,
                permissions:[admin_permission,subadmin_permission]
            }
        );

        console.log("application:");
        client.application.commands.fetch().then(cmds => console.log(cmds.find(cmd => cmd.name === "addvc").id));
        console.log("guild");
        client.guilds.cache.get(guildID)?.commands.fetch().then(cmds => console.log(cmds.find(cmd => cmd.name === "addvc").id));

        console.log(aaa);

        console.log("login with "+client.user.tag+" now");
        console.log(`applicationID：${client.application.id}`);
    },
};