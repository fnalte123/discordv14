const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require("discord.js");
const config = require("../../config.json");
const Streamers = require("../../schemas/streamers");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sletstreamer")
    .setDescription("Deletes a streamer from the list.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) => option.setName("rstreamer").setDescription("stream name:").setRequired(true)),
  async execute(interaction, client) {
    let streamername = interaction.options.getString("rstreamer");
    let streamerData = await Streamers.findOne({
      guildId: interaction.guild.id,
      streamername: streamername,
    });
    if(!streamerData) {
      await interaction.reply({
        content: `The streamer: ${streamername} is not on the list!`,
        ephemeral: true,
      })
    } else {
      await Streamers.deleteOne( { streamername: streamername } )
      await interaction.reply({
        content: `You removed: ${streamername} from the streamerlist!`,
        ephemeral: true,
      })
    }
  },
};
