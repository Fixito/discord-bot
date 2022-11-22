require("./deploy-commands");
const fs = require('node:fs');
const path = require('node:path');
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials
} = require('discord.js');
require('dotenv').config();

// Créé une instance du client
const client = new Client({
  intents: [
    ,
    GatewayIntentBits.Guilds, // Accès aux guildes
    GatewayIntentBits.GuildMessages, // Accès aux messages
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ],
  partials: [Partials.Message, Partials.Reaction] // Lit les anciens messages et réactions
});

client.commands = new Collection();

// Lit les fichiers de commandes
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

// Lit les fichiers d'event
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Connecte le bot
client.login(process.env.TOKEN);
