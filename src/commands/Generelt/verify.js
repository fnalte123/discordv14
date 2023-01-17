const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const config = require("../../config.json");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Sets the verify channel for the server."),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setDescription(config.verifymessage)
        .setColor(client.color)
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: client.user.username,
        });
        const button = new ButtonBuilder().setCustomId("verify").setLabel("Verify").setStyle(ButtonStyle.Secondary);
        await interaction
        .reply({
            embeds: [embed],
            ephemeral: false,
            components: [new ActionRowBuilder().addComponents(button)],
        }).then(async (msg) => {
            msg.delete({ timeout: 100 })
            await interaction.channel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents(button)],});
        });
    },
};
