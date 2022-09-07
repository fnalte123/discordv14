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
    .setName("forslag")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Send forslag besked!"),

  async execute(interaction, client) {
    const { channel } = interaction;
    const embed = new EmbedBuilder()
      .setDescription(config.forslagMessage)
      .setColor(client.color)
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.username + " | Lavet af Fnalte",
      });
    const button = new ButtonBuilder()
      .setCustomId("forslag")
      .setLabel("Opret forslag")
      .setStyle(ButtonStyle.Primary);

    await channel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents(button)],});
    await interaction.reply({
        ephemeral: true,
        content: "Du oprettede forslag kanalen!"
    });
  },
};
