const { Events } = require('discord.js');
const { getMembersToMention, sendMessage, sendDoc } = require('../utils');

const PREFIX = '!';

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    try {
      const guild = message.guild;

      if (
        !guild.available ||
        message.author.bot ||
        !message.content.startsWith(PREFIX)
      )
        return;

      const commandBody = message.content.trim().slice(PREFIX.length);
      const args = commandBody.trim().split(' ');
      const command = args.shift().toLowerCase();
      let sentence = '';

      if (command === 'aide') {
        sendDoc(message);
        return;
      }

      if (command === 'poll') {
        const poll = require('../utils/poll');

        poll.execute(message.client, message, args);
        return;
      }

      const membersOnline = await guild.members
        .fetch({ withPresences: true })
        .then((fetchedMembers) =>
          fetchedMembers.filter(
            (member) =>
              !member.user.bot &&
              (member.presence?.status === 'online' ||
                member.presence?.status === 'idle') &&
              message.author.id !== member.id
          )
        );

      if (command === 'flex' || command === 'aram' || command === 'duoq') {
        const members = await getMembersToMention(membersOnline, 'Feedeur');

        if (!members.length) {
          message.reply("Il n'y a pas de joueurs disponibles.");
          return;
        }

        if (command === 'flex') {
          sentence = `Une flex pour ${
            Math.random() >= 0.5 ? 'gagner' : 'perdre'
          } des LPs ?`;
        } else if (command === 'duoq') {
          sentence = 'Un copain pour duoQ ? :pray:';
        } else {
          sentence = 'Une ARAM pour se détendre ? :coffee:';
        }

        sendMessage(message, sentence, members);
        return;
      }

      if (command === 'among') {
        const members = await getMembersToMention(membersOnline, 'Imposteur');

        if (!members.length) {
          message.reply("Il n'y a pas de joueurs disponibles.");
          return;
        }

        sentence = 'Among Us ? :detective::knife:';
        sendMessage(message, sentence, members);
        return;
      }

      if (command === 'cs') {
        const members = await getMembersToMention(membersOnline, 'CS:GO');

        if (!members.length) {
          message.reply("Il n'y a pas de joueurs disponibles.");
          return;
        }

        sentence = "Un p'tit CS à l'ancienne ? :knife:";
        sendMessage(message, sentence, members);
        return;
      }

      if (command === 'valo') {
        const members = await getMembersToMention(membersOnline, 'Valorant');

        if (!members.length) {
          message.reply("Il n'y a pas de joueurs disponibles.");
          return;
        }

        sentence = 'Un Valolo ? 🔫';
        sendMessage(message, sentence, members);
        return;
      }

      message.reply(
        "Cette commande n'existe pas. Tapez `!aide` pour consulter la liste des commandes disponibles."
      );
    } catch (error) {
      console.log(error);
    }
  }
};
