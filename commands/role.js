const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription("Permet de s'assigner un ou plusieurs rôles"),
  async execute(interaction) {
    await interaction.reply('choix des rôles');
  }
};
