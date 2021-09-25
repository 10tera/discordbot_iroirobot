module.exports = {
    name: 'interactionCreate',
    async execute( interaction,client) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction(${interaction.commandName}:${interaction.commandId}).`);
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        console.log(interaction.commandId);
        if (!command) return;


        try {
            await command.execute(interaction,client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};