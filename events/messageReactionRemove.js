const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageReactionRemove,
  async execute(reaction, user) {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    const feedeurRole = reaction.message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === 'feedeur'
    );
    const imposteurRole = reaction.message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === 'imposteur'
    );
    const csgoRole = reaction.message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === 'cs:go'
    );
    const valorantRole = reaction.message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === 'valorant'
    );

    const feedeurEmoji = '🔞';
    const imposteurEmoji = '🕵️';
    const csgoEmoji = '🔪';
    const valorantEmoji = '🔫';

    if (reaction.emoji.name === feedeurEmoji) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(feedeurRole);
    }

    if (reaction.emoji.name === imposteurEmoji) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(imposteurRole);
    }

    if (reaction.emoji.name === csgoEmoji) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(csgoRole);
    }

    if (reaction.emoji.name === valorantEmoji) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(valorantRole);
    }
  }
};
