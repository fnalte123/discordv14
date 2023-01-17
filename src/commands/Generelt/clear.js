const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Bulk deletes messages.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addIntegerOption((option) => option.setName("amount").setDescription("Amount:").setRequired(true)),

    async execute(interaction, client) {
        let amount = interaction.options.getInteger("amount");
        if (amount < 100 || amount > 0) {
            await interaction.channel.bulkDelete(amount, true);
            const succesEmbed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`🧹 Deleted: ${amount} messages.`)
                .setFooter({
                    iconURL: client.user.displayAvatarURL(),
                    text: client.user.username,
                });
            await interaction.reply({
                embeds: [succesEmbed],
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, 3500);
        } else {
            const loserEmbed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`🧹 You cant delete more than 100 messages!.`)
                .setFooter({
                    iconURL: client.user.displayAvatarURL(),
                    text: client.user.username,
                });
            await interaction.reply({
                embeds: [loserEmbed],
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, 3500);
        }
    },
};
