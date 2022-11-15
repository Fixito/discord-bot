const { Events } = require('discord.js');

// Répond aux intéractions (commandes slash)
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
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
      console.error(
        `Il y a eu une erreur en exécutant la commande ${interaction.commandName}`
      );
      console.error(error);
    }
  }
};
