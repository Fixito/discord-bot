const PREFIX = '!';
const { getMembersToMention } = require('../utils/getMembersToMention');
const { sendMessage } = require('../utils/sendMessage');

const onMessage = async (message) => {
  const guild = message.guild;

  if (!guild.available) return;
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const input = message.content.trim().split(PREFIX).slice(1).join('');
  let sentence = '';
  // console.log(input);

  if (input === 'aide') {
    sentence = 'Voici la documentation du bot.';
    sendMessage(message, sentence);
    return;
  }

  const membersOnline = await guild.members
    .fetch({ withPresences: true })
    .then((fetchedMembers) =>
      fetchedMembers.filter(
        (member) => !member.user.bot && member.presence?.status === 'online'
      )
    );

  if (input === 'test' || input === 'aram' || input === 'duoQ') {
    const members = await getMembersToMention(membersOnline, 'Feedeur');

    if (!members.length) {
      message.reply("Il n'y a pas de joueurs disponibles.");
      return;
    }

    if (input === 'test') {
      sentence = `Une flex pour ${
        Math.random() >= 0.5 ? 'gagner' : 'perdre'
      } des LPs ?`;
    } else if (input === 'duoQ') {
      sentence = 'Un copain pour duoQ ? :pray:';
    } else {
      sentence = 'Une ARAM pour se détendre ? :coffee:';
    }

    if (input === 'Imposteur') {
      sentence = 'Among Us ? :knife:';
    }

    sendMessage(message, sentence, members);
    return;
  }

  if (input === 'among') {
    const members = await getMembersToMention(membersOnline, 'Imposteur');

    if (!members.length) {
      message.reply("Il n'y a pas de joueurs disponibles.");
      return;
    }

    sentence = 'Among Us ? :detective::knife:';
    sendMessage(message, sentence, members);
    return;
  }

  if (input === 'cs') {
    const members = await getMembersToMention(membersOnline, 'CS:GO');

    if (!members.length) {
      message.reply("Il n'y a pas de joueurs disponibles.");
      return;
    }

    sentence = "Un pt'it CS à l'ancienne ? :knife:";
    sendMessage(message, sentence, members);
    return;
  }

  if (input === 'valo') {
    const members = await getMembersToMention(membersOnline, 'Valorant');

    if (!members.length) {
      message.reply("Il n'y a pas de joueurs disponibles.");
      return;
    }

    sentence = 'Un Valolo ? :knife:';
    sendMessage(message, sentence, members);
    return;
  }

  message.reply("Cette commande n'existe pas.");
};

module.exports = { onMessage };
