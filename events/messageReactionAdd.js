const { Events } = require('discord.js');

// Répond à une réaction spécifique aux messages
module.exports = {
  name: Events.MessageReactionAdd,
  execute(reaction, user) {
    if (reaction.emoji.name === '🟨') {
      console.log('signalé');
      const channel = reaction.message.guild.channels.cache.get(
        '1017067799014817825'
      );
      channel.send(
        `Un message a été signalé par <@${user.id}>. Voici son lien : ${reaction.message.url}`
      );
    }
  }
};
