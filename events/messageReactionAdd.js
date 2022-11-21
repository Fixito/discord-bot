const { Events } = require('discord.js');

const feedeurEmoji = '🔞';
const imposteurEmoji = '🕵️';
const csgoEmoji = '🔪';
const valorantEmoji = '🔫';

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    if (user.bot) return;

    if (reaction.partial) {
      // Si le message auquel appartient cette réaction a été supprimé, la récupération peut entraîner une erreur d'API qui doit être gérée
      try {
        await reaction.fetch();
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération du message :",
          error
        );
        // Retourner car `reaction.message.author` peut être indéfini/null
        return;
      }
    }

    const channel = await reaction.message.guild.channels.cache.find(
      (channel) => channel.id === reaction.message.channelId
    );

    if (channel.name !== 'revendiquer-un-rôle') return;

    if (reaction.emoji.name === feedeurEmoji) {
      const feedeurRole = reaction.message.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === 'feedeur'
      );
      const member = reaction.message.guild.members.cache.find(
        (member) => member.id === user.id
      );
      member.roles.add(feedeurRole);
    } else if (reaction.emoji.name === imposteurEmoji) {
      const imposteurRole = reaction.message.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === 'imposteur'
      );
      const member = reaction.message.guild.members.cache.find(
        (member) => member.id === user.id
      );
      member.roles.add(imposteurRole);
    } else if (reaction.emoji.name === csgoEmoji) {
      const csgoRole = reaction.message.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === 'cs:go'
      );
      const member = reaction.message.guild.members.cache.find(
        (member) => member.id === user.id
      );
      member.roles.add(csgoRole);
    } else if (reaction.emoji.name === valorantEmoji) {
      const valorantRole = reaction.message.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === 'valorant'
      );
      const member = reaction.message.guild.members.cache.find(
        (member) => member.id === user.id
      );
      member.roles.add(valorantRole);
    } else {
      return;
    }
  }
};
