const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require("discord.js");
const config = require("../../config.json");
const dbchannels = require("../../schemas/channels");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("twitch")
    .setDescription("Sets the twitch channel for the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
      const { channel } = interaction;
      const embed = new EmbedBuilder()
      .setDescription(config.twitchmessage)
      .setColor(client.color)
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.username,
      });
      await channel.send({ embeds: [embed]});
      
      const twitchChannel = await new dbchannels({
        _id: mongoose.Types.ObjectId(),
        twitchChannel: channel,
      });
      
      await twitchChannel.save().catch((err) => console.log(err));
      await interaction.reply({
          ephemeral: true,
          content: "This channel was set as the twitch channel!"
      });
  },
};
