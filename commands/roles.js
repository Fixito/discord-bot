const {
  SlashCommandBuilder,
  ChannelType,
  PermissionsBitField
} = require('discord.js');
const { EmbedBuilder } = require('discord.js');

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
      let channel = await interaction.guild.channels.cache.find(
        (channel) => channel.name === 'revendiquer-un-rôle'
      );

      if (!channel) {
        channel = await interaction.guild.channels.create({
          name: 'revendiquer-un-rôle',
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.AddReactions
              ],
              deny: [PermissionsBitField.Flags.SendMessages]
            }
          ]
        });
      }

      await interaction.reply({
        content: 'La commande a bien été exécutée.',
        ephemeral: true
      });

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
    } catch (error) {
      console.log(error);
    }
  }
};
