const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require("discord.js");
const config = require("../../config.json");
const Streamers = require("../../schemas/streamers");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sletstreamer")
    .setDescription("Fjerner en streamer fra databasen")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) => option.setName("rstreamer").setDescription("Navn på streameren som skal fjernes.").setRequired(true)),
  async execute(interaction, client) {
    let streamername = interaction.options.getString("rstreamer");
    let streamerData = await Streamers.findOne({
      guildId: interaction.guild.id,
      streamername: streamername,
    });
    if(!streamerData) {
      await interaction.reply({
        content: `Streameren ${streamername} er ikke på listen over streamers!`,
        ephemeral: true,
      })
    } else {
      await Streamers.deleteOne( { streamername: streamername } )
      await interaction.reply({
        content: `Du fjernede ${streamername} fra listen over streamers!`,
        ephemeral: true,
      })
    }
  },
};
