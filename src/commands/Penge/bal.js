const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const users = require("../../schemas/users");
const mongoose = require("mongoose");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("bal")
    .setDescription("Se hvor mange penge du har!")
    .addStringOption((option) =>
      option.setName("bruger").setDescription("Bruger").setRequired(false)
    ),
  async execute(interaction, client) {
    const discordid = interaction.user.id;
    let balanceData = await users.findOne({
      discordid: discordid,
      guildId: interaction.guild.id,
    });
    if (balanceData) {
      var vinder = interaction.options.getString("bruger");
      if (!vinder) var vinder = interaction.user.username;
      const balance = new EmbedBuilder()
        .setTitle("Penge")
        .setDescription(
          vinder + " har: **" + balanceData.balance + "** DKK på kortet"
        )
        .setColor(client.color)
        .setFooter({
          iconURL: client.user.displayAvatarURL(),
          text: client.user.username + " | Lavet af Fnalte",
        });
      await interaction.reply({
        embeds: [balance],
      });
    } else {
      userProfile = await new users({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        discordid: discordid,
        discordname: interaction.user.tag,
      });
      await interaction.reply({
        content: "Du var ikke oprettet i databasen. Du oprettes nu!",
        ephemeral: true,
      });
      await userProfile.save().catch((err) => console.log(err));
    }
  },
};
