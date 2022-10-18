const TOKEN =
  'MTAxNzA2Njc4NjExMTM3MzM4Mw.GaK64n.K4Olt_YZ5RX2fmafdUPdG5znNB5kKFH1DRqG9c';

const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { onMessage, onReady } = require('./events');

// créé une instance du client
const client = new Client({
  intents: [
    ,
    GatewayIntentBits.Guilds, // accès aux guildes
    GatewayIntentBits.GuildMessages, // autorise à accéder aux messages
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Message, Partials.Reaction]
});

// agit quand le bot est prêt
client.on('ready', () => onReady(client));

// répond aux messages
client.on('messageCreate', onMessage);

// répond aux réactions
client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.emoji.name === '🟨') {
    console.log('signalé');
    const channel = reaction.message.guild.channels.cache.get(
      '1017067799014817825'
    );
    channel.send(
      `Un message a été signalé par <@${user.id}>. Voici son lien : ${reaction.message.url}`
    );
  }
});

// connecte le bot
client.login(TOKEN);
