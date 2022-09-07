const {EmbedBuilder } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: {
        name: `cancel-close`,
    },
    async execute(interaction, client) {
       await interaction.message.delete();
       
        return interaction.reply({
            ephemeral: true,
            content: "Du annulerede!",
        });
    },
};
