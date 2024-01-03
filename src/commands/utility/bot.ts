import { translator } from '@/langs'
import BaseCommand from '@/structs/base-command'
import { infoSubCommand, pingSubCommand } from '@/subcommands/bot'
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from 'discord.js'

export default class BotCommand extends BaseCommand {
  public static data: SlashCommandBuilder = <SlashCommandBuilder>(
    new SlashCommandBuilder()
      .setName('bot')
      .setDescription('Some bot commands')
      .setDescriptionLocalizations({
        'pt-BR': 'Alguns comandos do bot',
      })
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('ping')
          .setDescription('Replies with pong!')
          .setDescriptionLocalizations({
            'pt-BR': 'Responde com pong!',
          }),
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
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
        await pingSubCommand(interaction, this.client)
        break
      case 'info':
        await infoSubCommand(interaction, this.client)
        break
      default:
        await interaction.reply({
          content: txt('botClient.invalidInteraction'),
          ephemeral: true,
        })
    }
  }
}
