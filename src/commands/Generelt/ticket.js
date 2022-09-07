const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const config = require("../../config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Sætter ticket kanalen i databasen!"),

  async execute(interaction, client) {
    const button = new ButtonBuilder().setCustomId("open-ticket").setLabel("Opret ticket").setStyle(ButtonStyle.Primary);
    const Ticketembed = new EmbedBuilder().setTitle("Kontakt fnalte").setDescription(config.TicketMessage).setColor(client.color).setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: "Fnalte ticket system",
    });
    await interaction.reply({
        embeds: [Ticketembed],
        components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
