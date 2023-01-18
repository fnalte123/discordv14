const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require("discord.js");
const config = require("../../config.json");
const Streamers = require("../../schemas/streamers");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addstreamer")
    .setDescription("Add a streamer to the list.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) => option.setName("streamer").setDescription("Channelname:").setRequired(true)),
  async execute(interaction, client) {
    let streamername = interaction.options.getString("streamer");
    let streamerData = await Streamers.findOne({
      guildId: interaction.guild.id,
      streamername: streamername,
    });
    if(!streamerData) {
      streamerProfile = await new Streamers({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        streamername: streamername,
        IsLive: false,
      });
      await streamerProfile.save().catch((err) => console.log(err));

      await interaction.reply({
        content: `You added: ${streamername} to the streamerlist!`,
        ephemeral: true,
      })
    } else {
      await interaction.reply({
        content: "The streamer is already in the list!",
        ephemeral: true,
      })
    }
  },
};
