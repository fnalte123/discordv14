const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const config = require("../../config.json");

module.exports = {
  data: {
    name: `are-you-sure-close-ticket`,
  },
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle("**βEr du sikker?**")
      .setDescription(`Ticketen vil blive gemt i databasen`)
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.username,
      });

    const firstcloseButton = new ButtonBuilder()
      .setCustomId("close-ticket")
      .setLabel("Ja")
      .setEmoji("β")
      .setStyle(ButtonStyle.Success);
    const secondButton = new ButtonBuilder()
      .setCustomId("cancel-close")
      .setLabel("Nej")
      .setEmoji("β")
      .setStyle(ButtonStyle.Secondary);
    return interaction.reply({
      ephemeral: false,
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(firstcloseButton, secondButton),
      ],
    });
  },
};
