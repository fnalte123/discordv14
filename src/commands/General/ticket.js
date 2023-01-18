const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const config = require("../../config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Sets the ticket channel for the server."),

  async execute(interaction, client) {
    const button = new ButtonBuilder().setCustomId("open-ticket").setLabel(config.ticketBtnLabel).setStyle(ButtonStyle.Primary);
    const Ticketembed = new EmbedBuilder().setTitle(config.tickettitle).setDescription(config.TicketMessage).setColor(client.color)
    await interaction.reply({
        embeds: [Ticketembed],
        components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
