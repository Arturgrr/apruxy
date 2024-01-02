import { ApruxyClient } from '@/client'
import { env } from '@/env'
import { translator } from '@/langs'
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  CommandInteraction,
  EmbedBuilder,
} from 'discord.js'

const ping = async (interaction: CommandInteraction, client: ApruxyClient) => {
  const txt = translator.getFixedT(interaction.locale)

  const botPing = Math.round(client.ws.ping)
  const apiPing = Math.round(interaction.createdTimestamp - Date.now())

  const embed = new EmbedBuilder()
  embed
    .setAuthor({
      name: txt('ping.title'),
    })
    .setColor('#F3C7C8')
    .setDescription(txt('ping.description', { botPing, apiPing }))

  await interaction.reply({
    embeds: [embed],
  })
}

const info = async (
  interaction: ChatInputCommandInteraction,
  client: ApruxyClient,
) => {
  const txt = translator.getFixedT(interaction.locale)

  const serverNumber = client.guilds.cache.size
  const commandsNumber = client.commands.size

  const uses = await client.db.user.aggregate({
    _sum: {
      commandsCounter: true,
    },
  })
  const usedTimes = uses._sum.commandsCounter

  const embed = new EmbedBuilder()
  embed
    .setAuthor({
      name: txt('botinfo.title'),
      iconURL: client.user?.displayAvatarURL() || undefined,
    })
    .setColor('#F3C7C8')
    .setDescription(
      txt('botinfo.description', { serverNumber, commandsNumber, usedTimes }),
    )
    .setThumbnail(client.user?.displayAvatarURL() || null)
    .setFooter({
      text: txt('botinfo.footer'),
      iconURL: client.users.cache.get(env.OWNER_ID)?.displayAvatarURL(),
    })

  const button = new ButtonBuilder({
    label: txt('botinfo.button'),
    style: ButtonStyle.Link,
    url: `https://discord.com/oauth2/authorize?client_id=${env.CLIENT_ID}&scope=bot&permissions=1099511627775`,
    emoji: '💡',
  })

  await interaction.reply({
    embeds: [embed],
    components: [new ActionRowBuilder<ButtonBuilder>().addComponents(button)],
  })
}

export { ping, info }
