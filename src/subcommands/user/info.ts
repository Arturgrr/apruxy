import { translator } from '@/langs'
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'

export const infoSubCommand = async (
  interaction: ChatInputCommandInteraction,
) => {
  const txt = translator.getFixedT(interaction.locale)

  const user = interaction.options.getUser('user') || interaction.user

  const userEmbed = new EmbedBuilder()
  userEmbed
    .setColor('#5964F1')
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      {
        name: txt('user.info.name'),
        value: '```' + user.username + '```',
        inline: true,
      },
      {
        name: txt('user.info.id'),
        value: '```' + user.id + '```',
        inline: true,
      },
      {
        name: txt('user.info.created'),
        value: `<t:${Math.floor(
          user.createdAt.getTime() / 1000,
        )}:D> (<t:${Math.floor(user.createdAt.getTime() / 1000)}:R>)`,
        inline: false,
      },
    )

  if (interaction.guild) {
    await interaction.guild.members.fetch(user.id)?.then((member) => {
      const joinedTimestamp = member.joinedAt?.getTime()

      if (joinedTimestamp) {
        userEmbed.addFields({
          name: txt('user.info.joined'),
          value: `<t:${Math.floor(joinedTimestamp / 1000)}:D> (<t:${Math.floor(
            joinedTimestamp / 1000,
          )}:R>)`,
          inline: false,
        })
      }

      if (member.nickname) {
        userEmbed.setTitle(member.nickname)
      }
    })
  } else {
    userEmbed.setTitle(user.displayName)
  }

  interaction.reply({ embeds: [userEmbed] })
}
