const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const users = require("../../schemas/users");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("givpenge")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Giv penge til bruger!")
    .addUserOption((option) =>
      option
        .setName("bruger")
        .setDescription("Brugeren du vil give penge")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("penge")
        .setDescription("Hvor mange penge vil du give?")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const discordid = interaction.user.id;
    let vinder = interaction.options.getUser("bruger");
    let penge = interaction.options.getString("penge");
    let balanceData = await users.findOne({
      discordid: vinder.id,
      guildId: interaction.guild.id,
    });
    let npenge = balanceData.balance;
    let total = Math.round(parseInt(penge) + parseInt(npenge));
    await interaction
      .reply({
        ephemeral: true,
        content: `Du gav **${vinder.username}** **${penge}** DKK. Vedkommende har nu **${total}** DKK i alt`,
      })
      .then(async () => {
        await users.updateOne(
          { discordid: vinder.id, guildId: interaction.guild.id },
          { balance: total }
        );
      });
  },
};
