const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Connecté en tant que ${client.user.tag}`);

    client.user.setPresence({
      activities: [
        {
          name: 'discord.js'
        }
      ],
      status: 'dnd'
    });
  }
};
