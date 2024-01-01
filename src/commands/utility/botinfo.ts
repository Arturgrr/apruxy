import { env } from '@/env'
import { translator } from '@/langs'
import BaseCommand from '@/structs/base-command'
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js'

export default class BotInfoCommand extends BaseCommand {
  public static data: SlashCommandBuilder = <SlashCommandBuilder>(
    new SlashCommandBuilder()
      .setName('botinfo')
      .setDescription('Get bot info')
      .setDescriptionLocalizations({
        'pt-BR': 'Veja as informações do bot',
      })
  )

  async execute(interaction: CommandInteraction<CacheType>) {
    const txt = translator.getFixedT(interaction.locale)

    const serverNumber = this.client.guilds.cache.size
    const commandsNumber = this.client.commands.size

    const uses = await this.client.db.user.aggregate({
      _sum: {
        commandsCounter: true,
      },
    })
    const usedTimes = uses._sum.commandsCounter

    const embed = new EmbedBuilder()
    embed
      .setAuthor({
        name: txt('botinfo.title'),
        iconURL: this.client.user?.displayAvatarURL() || undefined,
      })
      .setColor('#F3C7C8')
      .setDescription(
        txt('botinfo.description', { serverNumber, commandsNumber, usedTimes }),
      )
      .setThumbnail(this.client.user?.displayAvatarURL() || null)
      .setFooter({
        text: txt('botinfo.footer'),
        iconURL: this.client.users.cache.get(env.OWNER_ID)?.displayAvatarURL(),
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
}
