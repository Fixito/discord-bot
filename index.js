const fs = require('node:fs');
const path = require('node:path');
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require('discord.js');
const { onMessage, onReady } = require('./events');

const TOKEN =
  'MTAxNzA2Njc4NjExMTM3MzM4Mw.GaK64n.K4Olt_YZ5RX2fmafdUPdG5znNB5kKFH1DRqG9c';

// créé une instance du client
const client = new Client({
  intents: [
    ,
    GatewayIntentBits.Guilds, // accès aux guildes
    GatewayIntentBits.GuildMessages, // autorise à accéder aux messages
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ],
  partials: [Partials.Message, Partials.Reaction]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Défini un nouvel item dans la Collection avec la clef comme nom de commande et la valeur comme module exporté
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[Attention] La commande du chemin ${filePath} manque d'une propriété "data" ou "execute" requise.`
    );
  }
}

// répond aux intéractions (commandes)
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(
      `Aucune commande correspondant à ${interaction.commandName} n'a été trouvé.`
    );
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'Il a y eu une erreur en exécutant cette commande.',
      ephemeral: true
    });
  }
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
