import { ApruxyClient } from '@/client'
import { translator } from '@/langs'
import { CommandInteraction, EmbedBuilder } from 'discord.js'

export const pingSubCommand = async (
  interaction: CommandInteraction,
  client: ApruxyClient,
) => {
  const txt = translator.getFixedT(interaction.locale)

  const botPing = Math.round(client.ws.ping)
  const apiPing = Math.round(interaction.createdTimestamp - Date.now())

  const embed = new EmbedBuilder()
  embed
    .setAuthor({
      name: txt('bot.ping.title'),
    })
    .setColor('#F3C7C8')
    .setDescription(txt('bot.ping.description', { botPing, apiPing }))

  await interaction.reply({
    embeds: [embed],
  })
}
