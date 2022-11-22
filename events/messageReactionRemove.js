const { Events } = require('discord.js');
const { toggleRole } = require('../utils');

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

    try {
      const channel = await reaction.message.guild.channels.cache.find(
        (channel) => channel.id === reaction.message.channelId
      );

      if (channel.name !== 'revendiquer-un-rôle') return;

      if (reaction.emoji.name === feedeurEmoji) {
        toggleRole(reaction, user, 'feedeur', 'remove');
        return;
      }

      if (reaction.emoji.name === imposteurEmoji) {
        toggleRole(reaction, user, 'imposteur', 'remove');
        return;
      }

      if (reaction.emoji.name === csgoEmoji) {
        toggleRole(reaction, user, 'cs:go', 'remove');
        return;
      }

      if (reaction.emoji.name === valorantEmoji) {
        toggleRole(reaction, user, 'valorant', 'remove');
        return;
      }

      return;
    } catch (error) {
      console.log(error);
    }
  }
};
