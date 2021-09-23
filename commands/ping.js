const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('test')
                .setRequired(true)
                .addChoice("1","1")
                .addChoice("2","2")
                .addChoice("3","3")
                .addChoice("4","4")),
    async execute(interaction) {
        const string=interaction.options.getString('input');
        await interaction.reply('team'+string);
    },
};