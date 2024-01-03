import { ApruxyClient } from '@/client'
import { translator } from '@/langs'
import { ChatInputCommandInteraction, User } from 'discord.js'

export const sendSubCommand = async (
  interaction: ChatInputCommandInteraction,
  client: ApruxyClient,
) => {
  const txt = translator.getFixedT(interaction.locale)
  const userOpt: User | null = interaction.options.getUser('user')
  const amount: number | null = interaction.options.getNumber('amount')

  if (!userOpt || !amount) {
    return interaction.reply({
      content: txt('botClient.errorInCommand'),
      ephemeral: true,
    })
  }

  await client.db.user
    .findUnique({
      where: { id: parseInt(interaction.user.id) },
    })
    .then(async (user) => {
      if (!user) {
        user = await client.db.user.create({
          data: {
            id: parseInt(interaction.user.id),
          },
        })
      }

      if (user.money < amount) {
        return interaction.reply({
          content: txt('send.notEnoughShells'),
          ephemeral: true,
        })
      }

      await client.db.user.update({
        where: { id: parseInt(interaction.user.id) },
        data: {
          money: user.money - amount,
        },
      })
    })

  await client.db.user
    .findUnique({
      where: { id: parseInt(userOpt.id) },
    })
    .then(async (user) => {
      if (!user) {
        user = await client.db.user.create({
          data: {
            id: parseInt(userOpt.id),
          },
        })
      }

      await client.db.user.update({
        where: { id: parseInt(userOpt.id) },
        data: {
          money: user.money + amount,
        },
      })
    })

  interaction.reply({
    content: txt('send.success', {
      sender: interaction.user.username,
      amount,
      receiver: userOpt.username,
    }),
  })
}
