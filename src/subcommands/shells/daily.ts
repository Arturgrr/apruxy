import { ApruxyClient } from '@/client'
import { translator } from '@/langs'
import { ChatInputCommandInteraction } from 'discord.js'

export const dailySubCommand = async (
  interaction: ChatInputCommandInteraction,
  client: ApruxyClient,
) => {
  const txt = translator.getFixedT(interaction.locale)

  await client.db.user
    .findUnique({
      where: { id: parseInt(interaction.user.id) },
    })
    .then(async (user) => {
      if (!user) {
        return interaction.reply({
          content: txt('botClient.errorInCommand'),
          ephemeral: true,
        })
      }

      if (user.lastDaily && user.lastDaily.getTime() > Date.now() - 86400000) {
        const time = `<t:${Math.floor(
          user.lastDaily.getTime() / 1000 + 86400,
        )}:R>`
        return interaction.reply({
          content: txt('daily.fail') + time,
        })
      }
      const value = Math.floor(Math.random() * (3000 - 1499 + 1)) + 1499

      await client.db.user.update({
        where: { id: parseInt(interaction.user.id) },
        data: {
          money: user.money + value,
          lastDaily: new Date(),
        },
      })

      interaction.reply({
        content: txt('daily.success', {
          quantity: value,
        }),
      })
    })
}
