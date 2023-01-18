const { EmbedBuilder, channelLink, messageLink } = require("discord.js");

module.exports = {
  data: {
    name: "suggestion",
  },
  async execute(interaction, client) {
    const member = interaction.user.tag;
    const { channel } = interaction;
    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle(`${member}'s suggestion:`)
      .setDescription(interaction.fields.getTextInputValue("forslagData"))
      .setFooter({
        iconURL: interaction.user.displayAvatarURL(),
        text: interaction.user.username,
      });
    const message = await channel.send({ embeds: [embed] });
    interaction.reply({
        content: "Thanks for your suggestion! The team will look into it as soon as possible.",
        ephemeral: true
    })

    message.react('👍')
    message.react('👎')

    
  },
};
