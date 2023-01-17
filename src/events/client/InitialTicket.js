const {
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const Ticket = require("../../schemas/ticket");
const mongoose = require("mongoose");
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const discordid = interaction.member.id;
    const { member, guild } = interaction;
    let everyoneid = guild.roles.everyone.id;
    if (interaction.customId == "open-ticket") {
      let ticketProfile = await Ticket.findOne({
        discordid: interaction.member.id,
        guildId: interaction.guild.id,
      });
      if (!ticketProfile) {
        let ticketnummer = interaction.user.username;
        ticketProfile = await new Ticket({
          _id: mongoose.Types.ObjectId(),
          guildId: interaction.guild.id,
          discordid: interaction.member.id,
          ticketnummer: ticketnummer,
        });
        await ticketProfile.save().catch((err) => console.log(err));
        await interaction.guild.channels
          .create({
            name: `ticket` + "-" + `${ticketnummer}`,
            type: ChannelType.GuildText,
            parent: "1014555138024804524",
            permissionOverwrites: [
              {
                id: member.id,
                allow: ["ViewChannel", "SendMessages"],
              },
              {
                id: everyoneid,
                deny: ["ViewChannel"],
              },
            ],
          })
          .then(async (channel) => {
            const embed = new EmbedBuilder()
              .setColor(client.color)
              .setDescription(`Hey ${member}! beskriv dit problem her`)
              .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.username + " | Lavet af Fnalte",
              });
            const closeButton = new ButtonBuilder()
              .setCustomId("are-you-sure-close-ticket")
              .setLabel("Luk")
              .setStyle(ButtonStyle.Primary);
            channel.send({
              embeds: [embed],
              components: [new ActionRowBuilder().addComponents(closeButton)],
            });
          });
      } else {
        // await Ticket.deleteOne( { discordid: interaction.member.id } )
      }
    }
  },
};
