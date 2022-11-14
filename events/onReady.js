const onReady = async (client) => {
  console.log(`Connecté en tant que ${client.user.tag}`);

  client.user.setPresence({
    activities: [
      {
        name: 'discord.js'
      }
    ],
    status: 'dnd'
  });
};

module.exports = { onReady };
