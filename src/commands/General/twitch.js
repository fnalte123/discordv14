const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require("discord.js");
const config = require("../../config.json");
const dbchannels = require("../../schemas/channels");
const mongoose = require("mongoose");
const { db } = require("../../schemas/channels");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("twitch")
    .setDescription("Sets the twitch channel for the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
      
    const twitchChannel = await dbchannels.findOne({ guildId: interaction.guild.id });
    if(!twitchChannel) {

      twitchChannelNew = await new dbchannels({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        twitchchannel: interaction.channel.id,
      });
      await twitchChannelNew.save().catch((err) => console.log(err));
      await interaction.reply({
          ephemeral: true,
          content: "You created the twitch channel!"
      });
    } else {
      await dbchannels.findOneAndUpdate({guildId: interaction.guild.id}, {twitchchannel: interaction.channel.id});
      await interaction.reply({
        ephemeral: true,
        content: "You updated the twitch channel!"
      });
    }
  },
};
