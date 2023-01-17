const {EmbedBuilder } = require("discord.js");
const Ticket = require("../../schemas/ticket");

module.exports = {
    data: {
        name: `close-ticket`,
    },
    async execute(interaction, client) {
        await interaction.message.delete();
        const closed = new EmbedBuilder()
        .setColor(client.color)
        .setTitle("✅ **Ticket lukket!**")
        .setDescription(`Denne ticket blev lukket af ${interaction.user.tag}. \n Denne kanal vil blive slettet om 5 sekunder.`)
        .setAuthor({
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.user.username
        })
        setTimeout( async () => {
            await Ticket.deleteOne( { discordid: interaction.member.id } )
            interaction.channel.delete();
        }, 10 * 500);
        interaction.reply({
            ephemeral: true,
            embeds: [closed],
        });
    },
};
