const { Events } = require('discord.js');

// Répond à une réaction spécifique aux messages
module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

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

    if (reaction.emoji.name === '🟨') {
      const channel = reaction.message.guild.channels.cache.get(
        '1017067799014817825'
      );
      channel.send(
        `Un message a été signalé par <@${user.id}>. Voici son lien : ${reaction.message.url}`
      );
    }

    if (reaction.emoji.name === feedeurEmoji) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(feedeurRole);
    }

    if (reaction.emoji.name === imposteurEmoji) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(imposteurRole);
    }

    if (reaction.emoji.name === csgoEmoji) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(csgoRole);
    }

    if (reaction.emoji.name === valorantEmoji) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(valorantRole);
    }
  }
};
