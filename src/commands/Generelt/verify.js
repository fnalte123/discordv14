const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const config = require("../../config.json");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Send verify besked!"),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setDescription(config.verifymessage)
        .setColor(client.color)
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: client.user.username + " | Lavet af Fnalte",
        });
        const button = new ButtonBuilder().setCustomId("verify").setLabel("Verify").setStyle(ButtonStyle.Secondary);
        await interaction
            .reply({
                embeds: [embed],
                ephemeral: false,
                components: [new ActionRowBuilder().addComponents(button)],
            })
    },
};
