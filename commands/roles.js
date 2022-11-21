const {
  SlashCommandBuilder,
  ChannelType,
  PermissionsBitField
} = require('discord.js');
const { EmbedBuilder } = require('discord.js');

// emojis
const feedeurEmoji = '🔞';
const imposteurEmoji = '🕵️';
const csgoEmoji = '🔪';
const valorantEmoji = '🔫';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription(
      "Crée un canal pour s'assigner/se retirer un rôle avec une réaction"
    ),
  async execute(interaction) {
    try {
      let channel = interaction.guild.channels.cache.find(
        (channel) => channel.name === 'revendiquer-un-rôle'
      );

      if (!channel) {
        channel = await interaction.guild.channels.create({
          name: 'revendiquer-un-rôle',
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              allow: [PermissionsBitField.Flags.ViewChannel],
              deny: [PermissionsBitField.Flags.SendMessages]
            }
          ]
        });
      }

      const embeddedMessage = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Rôles')
        .setDescription('Choississez un ou plusieurs rôles :')
        .addFields(
          {
            name: feedeurEmoji,
            value: 'Feedeur',
            inline: true
          },
          {
            name: imposteurEmoji,
            value: 'Imposteur',
            inline: true
          },
          {
            name: csgoEmoji,
            value: 'CS:GO',
            inline: true
          },
          {
            name: valorantEmoji,
            value: 'Valorant',
            inline: true
          }
        );
      const interactionMessage = await channel.send({
        embeds: [embeddedMessage]
      });

      await interactionMessage.react(feedeurEmoji);
      await interactionMessage.react(imposteurEmoji);
      await interactionMessage.react(csgoEmoji);
      await interactionMessage.react(valorantEmoji);

      await interaction.reply({
        content: 'La commande a bien été exécutée.',
        ephemeral: true
      });
    } catch (error) {
      console.log(error);
    }

    // const feedeurRole = interaction.guild.roles.cache.find(
    //   (role) => role.name.toLowerCase() === 'feedeur'
    // );
    // const imposteurRole = interaction.guild.roles.cache.find(
    //   (role) => role.name.toLowerCase() === 'imposteur'
    // );
    // const csgoRole = interaction.guild.roles.cache.find(
    //   (role) => role.name.toLowerCase() === 'cs:go'
    // );
    // const valorantRole = interaction.guild.roles.cache.find(
    //   (role) => role.name.toLowerCase() === 'valorant'
    // );

    // const filter = (reaction, user) =>
    //   [feedeurEmoji, imposteurEmoji, csgoEmoji, valorantEmoji].includes(
    //     reaction.emoji.name
    //   ) && user.id === interaction.user.id;
    // interactionMessage
    //   .awaitReactions({ filter, time: 3_000, errors: ['time'] })
    //   .then((collected) => {
    //     const reactions = collected.map((reaction) => reaction);
    //     const newReactions = reactions.map((reaction) => {
    //       const {
    //         emoji: { name }
    //       } = reaction;
    //       const reactionUsersId = reaction.users.cache
    //         .filter((user) => !user.bot)
    //         .map((user) => user.id);
    //       return { emoji: name, usersId: reactionUsersId };
    //     });
    //     for (const reaction of newReactions) {
    //       if (reaction.emoji === feedeurEmoji) {
    //         reaction.usersId.forEach((id) => {
    //           interaction.guild.members.cache.get(id).roles.add(feedeurRole);
    //         });
    //       }
    //       if (reaction.emoji === imposteurEmoji) {
    //         reaction.usersId.forEach((id) =>
    //           interaction.guild.members.cache.get(id).roles.add(imposteurRole)
    //         );
    //       }
    //       if (reaction.emoji === csgoEmoji) {
    //         reaction.usersId.forEach((id) =>
    //           interaction.guild.members.cache.get(id).roles.add(csgoRole)
    //         );
    //       }
    //       if (reaction.emoji === valorantEmoji) {
    //         reaction.usersId.forEach((id) =>
    //           interaction.guild.members.cache.get(id).roles.add(valorantRole)
    //         );
    //       }
    //     }
    //   })
    //   .catch(() => console.log('error'));
  }
};
