const {
  SlashCommandBuilder,
  Client,
  GatewayIntentBits,
  Partials
} = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription("Permet de s'assigner un ou plusieurs rôles"),
  async execute(interaction) {
    // const feedeurRole = interaction.guild.roles.cache.find(
    //   (role) => role.name.toLowerCase() === 'feedeur'
    // );
    // const imposteurRole = interaction.guild.roles.cache.find(
    //   (role) => role.name.toLowerCase() === 'imposteur'
    // );
    // const csgoRole = interaction.guild.roles.cache.find(
    //   (role) => role.name.toLowerCase() === 'cs:go'
    // );
    // const valorantRole = interaction.guild.roles.cache.find(
    //   (role) => role.name.toLowerCase() === 'valorant'
    // );

    const feedeurEmoji = '🔞';
    const imposteurEmoji = '🕵️';
    const csgoEmoji = '🔪';
    const valorantEmoji = '🔫';

    const embeddedMessage = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('Rôles')
      .setDescription('Choississez un ou plusieurs rôles :')
      .addFields(
        {
          name: feedeurEmoji,
          value: 'Feedeur',
          inline: true
        },
        {
          name: imposteurEmoji,
          value: 'Imposteur',
          inline: true
        },
        {
          name: csgoEmoji,
          value: 'CS:GO',
          inline: true
        },
        {
          name: valorantEmoji,
          value: 'Valorant',
          inline: true
        }
      );

    const interactionMessage = await interaction.reply({
      embeds: [embeddedMessage],
      fetchReply: true
    });

    try {
      await interactionMessage.react(feedeurEmoji);
      await interactionMessage.react(imposteurEmoji);
      await interactionMessage.react(csgoEmoji);
      await interactionMessage.react(valorantEmoji);
    } catch (error) {
      console.error(`Un des émojis a échoué à réagir : ${error}`);
    }

    // const filter = (reaction, user) =>
    //   [feedeurEmoji, imposteurEmoji, csgoEmoji, valorantEmoji].includes(
    //     reaction.emoji.name
    //   ) && user.id === interaction.user.id;

    // const collector = interactionMessage.createReactionCollector({
    //   filter,
    //   time: 15000
    // });

    // collector.on('collect', (reaction, user) => {
    //   if (reaction.emoji.name === feedeurEmoji) {
    //     interaction.guild.members.cache.get(user.id).roles.add(feedeurRole);
    //   }

    //   if (reaction.emoji.name === imposteurEmoji) {
    //     interaction.guild.members.cache.get(user.id).roles.add(imposteurRole);
    //   }

    //   if (reaction.emoji.name === csgoEmoji) {
    //     interaction.guild.members.cache.get(user.id).roles.add(csgoRole);
    //   }

    //   if (reaction.emoji.name === valorantEmoji) {
    //     interaction.guild.members.cache.get(user.id).roles.add(valorantRole);
    //   }
    // });
  }
};
