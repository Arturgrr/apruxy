import { translator } from '@/langs'
import BaseCommand from '@/structs/base-command'
import { info, ping } from '@/subcommands/bot'
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js'

export default class BotCommand extends BaseCommand {
  public static data: SlashCommandBuilder = <SlashCommandBuilder>(
    new SlashCommandBuilder()
      .setName('bot')
      .addSubcommand((subcommand) =>
        subcommand
          .setName('ping')
          .setDescription('Replies with pong!')
          .setDescriptionLocalizations({
            'pt-BR': 'Responde com pong!',
          }),
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName('info')
          .setDescription('Get bot info')
          .setDescriptionLocalizations({
            'pt-BR': 'Veja as informações do bot',
          }),
      )
  )

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const txt = translator.getFixedT(interaction.locale)

    switch (interaction.options.getSubcommand()) {
      case 'ping':
        await ping(interaction, this.client)
        break
      case 'info':
        await info(interaction, this.client)
        break
      default:
        await interaction.reply({
          content: txt('botClient.invalidInteraction'),
          ephemeral: true,
        })
    }
  }
}
