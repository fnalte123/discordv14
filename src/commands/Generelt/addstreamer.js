const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require("discord.js");
const config = require("../../config.json");
const Streamers = require("../../schemas/streamers");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addstreamer")
    .setDescription("Tilføj en streamer til databasen")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) => option.setName("streamer").setDescription("Navn på streameren som skal tilføjes.").setRequired(true)),
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
        content: `Du tilføjede ${streamername} til listen over streamers!`,
        ephemeral: true,
      })
    } else {
      await interaction.reply({
        content: "Denne streamer er allerede på listen!",
        ephemeral: true,
      })
    }
  },
};
