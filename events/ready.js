const { Events } = require('discord.js');

const rolesToCreate = ['Feedeur', 'Imposteur', 'CS:GO', 'Valorant'];

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

    try {
      const guilds = client.guilds.cache;

      guilds.forEach((guild) => {
        const guildRoles = guild.roles.cache.map((role) => role.name);

        rolesToCreate.forEach((roleToCreate) => {
          if (!guildRoles.includes(roleToCreate)) {
            guild.roles
              .create({ name: roleToCreate })
              .then(console.log(`Le rôle ${roleToCreate} a été créé.`))
              .catch(console.error);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
};
