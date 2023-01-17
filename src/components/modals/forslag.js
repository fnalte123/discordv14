const { EmbedBuilder, channelLink, messageLink } = require("discord.js");

module.exports = {
  data: {
    name: "forslag",
  },
  async execute(interaction, client) {
    const member = interaction.user.tag;
    const { channel } = interaction;
    const lort = ":thumbsup:" + ":thumbsdown:" 
    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle(`${member}'s forslag:`)
      .setDescription(interaction.fields.getTextInputValue("forslagData"))
      .setFooter({
        iconURL: interaction.user.displayAvatarURL(),
        text: interaction.user.username,
      });
    const message = await channel.send({ embeds: [embed] });
    interaction.reply({
        content: "Du sendte et forslag!",
        ephemeral: true
    })

    message.react('👍')
    message.react('👎')

    
  },
};
