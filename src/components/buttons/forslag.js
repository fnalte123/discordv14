const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
} = require("discord.js");
const config = require("../../config.json");

module.exports = {
  data: {
    name: `forslag`,
  },
  async execute(interaction, client) {
    const modal = new ModalBuilder().setCustomId("forslag").setTitle("Forslag");

    const forslagData = new TextInputBuilder()
      .setCustomId("forslagData")
      .setLabel("Skriv dit forslag her!")
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(new ActionRowBuilder().addComponents(forslagData));

    await interaction.showModal(modal);
  },
};
