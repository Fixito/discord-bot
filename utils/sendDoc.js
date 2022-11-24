const { EmbedBuilder } = require('discord.js');

const sendDoc = (message) => {
  const embeddedMessage = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Aide')
    .setDescription(
      [
        '__**Liste des commandes disponibles :**__',
        '**!poll** pour Créer un sondage\n__Usage:__ Titre + Option 1 + Option 2 + Option 3 + etc...',
        '__Mentionner tous les membres en ligne ayant le rôle `Feedeur` :__',
        '**!flex** pour faire une flex.',
        '**!aram** pour faire une ARAM.',
        '**!duoq** pour faire une duoQ.',
        '__Mentionner tous les membres en ligne ayant le rôle `Imposteur` :__',
        '**!among** pour faire un Among Us.',
        '__Mentionner tous les membres en ligne ayant le rôle `CS:GO` :__',
        '**!cs** pour faire un CS:GO.',
        '__Mentionner tous les membres en ligne ayant le rôle `Valorant` :__',
        '**!valo** pour faire un Valorant.'
      ].join('\n\n')
    );

  message.channel
    .send({ embeds: [embeddedMessage] })
    .then(() => message.delete())
    .catch((err) => console.log(err));
};

module.exports = { sendDoc };
