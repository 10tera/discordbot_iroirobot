const {clientID, guildID,commandID} = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        /*
        const admin_permission={
            id:"731459188605190176",
            type:"ROLE",
            permission:true
        };
        const subadmin_permission={
            id:"792361533803331595",
            type:"ROLE",
            permission: true
        };
        const commands = client.guilds.cache.get(guildID)?.commands;

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
        commands.permissions.set(
            {
                command:commandID.teamdeleteadmin,
                permissions:[admin_permission,subadmin_permission]
            }
        );

         */


        console.log("login with "+client.user.tag+" now");
        console.log(`applicationID：${client.application.id}`);
    },
};