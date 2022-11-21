const { Events } = require('discord.js');

// emojis
const feedeurEmoji = '🔞';
const imposteurEmoji = '🕵️';
const csgoEmoji = '🔪';
const valorantEmoji = '🔫';

module.exports = {
  name: Events.MessageReactionRemove,
  async execute(reaction, user) {
    if (user.bot) return;

    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération du message :",
          error
        );
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
      member.roles.remove(feedeurRole);
    } else if (reaction.emoji.name === imposteurEmoji) {
      const imposteurRole = reaction.message.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === 'imposteur'
      );
      const member = reaction.message.guild.members.cache.find(
        (member) => member.id === user.id
      );
      member.roles.remove(imposteurRole);
    } else if (reaction.emoji.name === csgoEmoji) {
      const csgoRole = reaction.message.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === 'cs:go'
      );
      const member = reaction.message.guild.members.cache.find(
        (member) => member.id === user.id
      );
      member.roles.remove(csgoRole);
    } else if (reaction.emoji.name === valorantEmoji) {
      const valorantRole = reaction.message.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === 'valorant'
      );
      const member = reaction.message.guild.members.cache.find(
        (member) => member.id === user.id
      );
      member.roles.remove(valorantRole);
    } else {
      return;
    }
  }
};
