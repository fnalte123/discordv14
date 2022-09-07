const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const users = require("../../schemas/users");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gamble")
    .setDescription("Spil lortet væk!")
    .addStringOption((option) =>
      option
        .setName("penge")
        .setDescription("Antal penge du vil gamble")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const discordid = interaction.user.id;
    let balanceData = await users.findOne({
      discordid: interaction.member.id,
      guildId: interaction.guild.id,
    });
    if (balanceData) {
      const indsats = interaction.options.getString("penge");
      if (parseInt(balanceData.balance) >= parseInt(indsats)) {
        let chance = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        if (chance === "1" || chance === 1) {
          let winamount = parseInt(indsats) * 2;
          const win = new EmbedBuilder()
            .setTitle("Tillykke")
            .setDescription(`Du vandt ${winamount} DKK.`)
            .setColor("#00FF00")
            .setFooter({
              iconURL: client.user.displayAvatarURL(),
              text: client.user.username + " | Lavet af Fnalte",
            });
          await interaction
            .reply({
              embeds: [win],
            })
            .then(async () => {
              let total = Math.round(
                parseInt(balanceData.balance) + parseInt(winamount)
              );
              await users.updateOne(
                {
                  discordid: interaction.user.id,
                  guildId: interaction.guild.id,
                },
                { balance: total }
              );
            });
        } else {
          // Taber
          const lose = new EmbedBuilder()
            .setTitle("Øv, Du tabte :/")
            .setDescription(`Du tabte desværre ${indsats} DKK.`)
            .setColor("#ff0000")
            .setFooter({
              iconURL: client.user.displayAvatarURL(),
              text: client.user.username + " | Lavet af Fnalte",
            });
          await interaction
            .reply({
              embeds: [lose],
            })
            .then(async () => {
              let total = Math.round(
                parseInt(balanceData.balance) - parseInt(indsats)
              );
              await users.updateOne(
                {
                  discordid: interaction.user.id,
                  guildId: interaction.guild.id,
                },
                { balance: total }
              );
            });
        }
      } else
        await interaction.reply({
          content: "Du har ikke penge nok til dette!",
          ephemeral: true,
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
