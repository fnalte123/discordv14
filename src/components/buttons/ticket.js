const { EmbedBuilder } = require("discord.js");
const Ticket = require("../../schemas/ticket");
module.exports = {
    data: {
        name: `open-ticket`,
    },
    async execute(interaction, client) {
        let ticketProfile = await Ticket.findOne({
            discordid: interaction.member.id,
            guildId: interaction.guild.id,
          });
        if(!ticketProfile) {
            const created = new EmbedBuilder()
            .setColor(client.color)
            .setTitle("✅ **Ticket oprettet!**")
            .setDescription(`Din ticket blev oprettet!`)
            .setAuthor({
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.username
            })
            interaction.reply({
                ephemeral: true,
                embeds: [created],
            });
        } else {
            interaction.reply({
                ephemeral: true,
                content: "Du har allerede en ticket åben!",
            });
        }
    },
};
