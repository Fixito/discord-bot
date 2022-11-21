const { REST, Routes } = require('discord.js');
const fs = require('node:fs');

const TOKEN =
  'MTAxNzA2Njc4NjExMTM3MzM4Mw.GaK64n.K4Olt_YZ5RX2fmafdUPdG5znNB5kKFH1DRqG9c';
const clientId = '1017066786111373383';

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
const rest = new REST({ version: '10' }).setToken(TOKEN);

// déploie les commandes
(async () => {
  try {
    console.log(
      `Début de l'actualisation de ${commands.length} commandes d'application (/).`
    );

    // la méthode put est utilisé pour rafraîchir toutes les commandes dans la guilde avec le set courant
    await rest.put(Routes.applicationCommands(clientId), {
      body: commands
    });

    console.log(
      `Rechargement réussi de ${commands.length} commandes d'application (/).`
    );
  } catch (error) {
    console.error(error);
  }
})();
