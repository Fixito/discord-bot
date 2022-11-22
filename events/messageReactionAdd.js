const { Events } = require('discord.js');
const { toggleRole } = require('../utils');

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

    try {
      const channel = await reaction.message.guild.channels.cache.find(
        (channel) => channel.id === reaction.message.channelId
      );

      if (channel.name !== 'revendiquer-un-rôle') return;

      if (reaction.emoji.name === feedeurEmoji) {
        toggleRole(reaction, user, 'feedeur', 'add');
        return;
      }

      if (reaction.emoji.name === imposteurEmoji) {
        toggleRole(reaction, user, 'imposteur', 'add');
        return;
      }

      if (reaction.emoji.name === csgoEmoji) {
        toggleRole(reaction, user, 'cs:go', 'add');
        return;
      }

      if (reaction.emoji.name === valorantEmoji) {
        toggleRole(reaction, user, 'valorant', 'add');
        return;
      }

      return;
    } catch (error) {
      console.log(error);
    }
  }
};
