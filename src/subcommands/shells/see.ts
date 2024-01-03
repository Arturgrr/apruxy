import { ApruxyClient } from '@/client'
import { translator } from '@/langs'
import { ChatInputCommandInteraction, User } from 'discord.js'

export const seeSubCommand = async (
  interaction: ChatInputCommandInteraction,
  client: ApruxyClient,
) => {
  const txt = translator.getFixedT(interaction.locale)
  const userOpt: User = interaction.options.getUser('user') || interaction.user

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

      interaction.reply({
        content: txt('shells', {
          person: userOpt.username,
          quantity: user.money,
        }),
      })
    })
}
