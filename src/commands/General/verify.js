const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
const dbchannels = require("../../schemas/channels");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Sets the verify channel for the server."),

    async execute(interaction, client) {
        const { channel } = interaction;
        
        const embed = new EmbedBuilder()
        .setDescription(config.verifymessage)
        .setColor(client.color)

        const verifychannel = await dbchannels.findOne({ guildId: interaction.guild.id });
        if(!verifychannel) {
    
            verifychannelNew = await new dbchannels({
            _id: mongoose.Types.ObjectId(),
            guildId: interaction.guild.id,
            verifychannel: interaction.channel.id,
          });
          await verifychannelNew.save().catch((err) => console.log(err));
          const button = new ButtonBuilder().setCustomId("verify").setLabel("Verify").setStyle(ButtonStyle.Secondary);
          await channel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents(button)],});
          await interaction.reply({
            ephemeral: true,
            content: "You created the verify channel!"
            });
        } else {
          await dbchannels.findOneAndUpdate({guildId: interaction.guild.id}, {verifychannel: interaction.channel.id});
          const button = new ButtonBuilder().setCustomId("verify").setLabel("Verify").setStyle(ButtonStyle.Secondary);
          await channel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents(button)],});
          await interaction.reply({
            ephemeral: true,
            content: "You updated the verify channel!"
            });
        }

    },
};
