const PREFIX = '!';
const FNG_ID = '178454294314352640';

const onMessage = async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const input = message.content.trim().split(PREFIX).slice(1).join('');
  console.log(input);

  if (input === 'aide') {
    message.channel
      .send('Voici la documentation du bot')
      .then(() => {
        message.delete();
      })
      .catch(console.log('erreur'));
    return;
  }

  if (input === 'test') {
    console.log(message.guild.id);
    return;
  }

  message.reply("Cette commande n'existe pas.");
};

module.exports = { onMessage };
