const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription("Permet de s'assigner un ou plusieurs rôles"),
  async execute(interaction) {
    // const reactionInteraction = await interaction.reply({
    //   content: 'choix des rôles',
    //   fetchReply: true
    // });

    const embeddedMessage = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('Rôles')
      .setDescription('Choississez un ou plusieurs rôles :')
      .addFields({
        name: '🔞',
        value: 'Feedeur'
      });

    const interactionMessage = await interaction.reply({
      embeds: [embeddedMessage],
      fetchReply: true
    });

    await interactionMessage.react('🔞');
  }
};
