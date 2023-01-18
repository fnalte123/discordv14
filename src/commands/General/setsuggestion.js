const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");
const config = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setsuggestion")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Set the suggestion channel for the server."),

  async execute(interaction, client) {
    const { channel } = interaction;
    const embed = new EmbedBuilder()
      .setDescription(config.forslagMessage)
      .setColor(client.color)
    const button = new ButtonBuilder()
      .setCustomId("forslag")
      .setLabel(config.suggestionButtonLabel)
      .setStyle(ButtonStyle.Primary);

    await channel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents(button)],});
    await interaction.reply({
        ephemeral: true,
        content: "You created the suggestion channel!"
    });
  },
};
