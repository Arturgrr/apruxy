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
      where: { id: interaction.user.id },
    })
    .then(async (user) => {
      if (!user) {
        user = await client.db.user.create({
          data: {
            id: interaction.user.id,
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
        where: { id: interaction.user.id },
        data: {
          money: user.money - amount,
        },
      })
    })

  await client.db.user
    .findUnique({
      where: { id: userOpt.id },
    })
    .then(async (user) => {
      if (!user) {
        user = await client.db.user.create({
          data: {
            id: userOpt.id,
          },
        })
      }

      await client.db.user.update({
        where: { id: userOpt.id },
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
