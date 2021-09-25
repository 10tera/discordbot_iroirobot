module.exports = {
    data: {
        name:"ping",
        description:"reply pong",
        options:[
            {
                type:3,
                name:"input",
                description: "test",
                required:true
            }
        ]
    },
    async execute(interaction) {
        const string=interaction.options.getString('input');
        await interaction.reply('team'+string);

    },
};