const { Events } = require('discord.js');
const removeSpecificRoleToUser = require('../utils/removeSpecificRoleToUser');

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
      console.log(removeSpecificRoleToUser);
      removeSpecificRoleToUser(reaction, user, 'feedeur');
      return;
    }

    if (reaction.emoji.name === imposteurEmoji) {
      removeSpecificRoleToUser(reaction, user, 'imposteur');
      return;
    }

    if (reaction.emoji.name === csgoEmoji) {
      removeSpecificRoleToUser(reaction, user, 'cs:go');
      return;
    }

    if (reaction.emoji.name === valorantEmoji) {
      removeSpecificRoleToUser(reaction, user, 'valorant');
      return;
    }

    return;
  }
};
