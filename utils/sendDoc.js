const { EmbedBuilder } = require('discord.js');

const sendDoc = (message) => {
  const embeddedMessage = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Aide')
    .setDescription('Liste des commandes disponibles :')
    .addFields(
      {
        name: '!flex',
        value:
          'Mentionne tous les membres en ligne ayant le rôle `Feedeur` pour faire une flex.'
      },
      {
        name: '!aram',
        value:
          'Mentionne tous les membres en ligne ayant le rôle `Feedeur` pour faire une ARAM.'
      },
      {
        name: '!duoq',
        value:
          'Mentionne tous les membres en ligne ayant le rôle `Feedeur` pour faire une DuoQ.'
      },
      {
        name: '!among',
        value:
          'Mentionne tous les membres en ligne ayant le rôle `Imposteur` pour faire un Among Us.'
      },
      {
        name: '!cs',
        value:
          'Mentionne tous les membres en ligne ayant le rôle `CS:GO` pour faire un CS:GO.'
      },
      {
        name: '!valo',
        value:
          'Mentionne tous les membres en ligne ayant le rôle `Valorant` pour faire un Valorant.'
      }
    );

  message.channel
    .send({ embeds: [embeddedMessage] })
    .then(() => message.delete())
    .catch((err) => console.log(err));
};

module.exports = { sendDoc };
