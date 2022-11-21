const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
require('dotenv').config();

const commands = [];

// Récupère touts les fichiers de commandes dans le dossier "commands"
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

// Récupère la sortie SlashCommandBuilder#toJSON() de la propriété "data" de chaque commande pour le déploiement
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Construit et prépare un instance du module REST
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// déploie les commandes
(async () => {
  try {
    console.log(
      `Début de l'actualisation de ${commands.length} commandes d'application (/).`
    );

    // la méthode put est utilisé pour rafraîchir toutes les commandes dans la guilde avec le set courant
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands
    });

    console.log(
      `Rechargement réussi de ${commands.length} commandes d'application (/).`
    );
  } catch (error) {
    console.error(error);
  }
})();
