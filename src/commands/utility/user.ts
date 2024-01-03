import { translator } from '@/langs'
import BaseCommand from '@/structs/base-command'
import { infoSubCommand } from '@/subcommands/user'
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandUserOption,
} from 'discord.js'

export default class UserCommand extends BaseCommand {
  public static data: SlashCommandBuilder = <SlashCommandBuilder>(
    new SlashCommandBuilder()
      .setName('user')
      .setDescription('Some user commands')
      .setDescriptionLocalizations({
        'pt-BR': 'Alguns comandos do usuário',
      })
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('info')
          .setDescription('Get user info')
          .setDescriptionLocalizations({
            'pt-BR': 'Veja as informações do usuário',
          })
          .addUserOption(
            new SlashCommandUserOption()
              .setName('user')
              .setNameLocalizations({ 'pt-BR': 'usuário' })
              .setDescription('User to get info')
              .setDescriptionLocalizations({
                'pt-BR': 'Usuário para ver as informações',
              })
              .setRequired(false),
          ),
      )
  )

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const txt = translator.getFixedT(interaction.locale)

    switch (interaction.options.getSubcommand()) {
      case 'info':
        await infoSubCommand(interaction)
        break
      default:
        await interaction.reply({
          content: txt('botClient.invalidInteraction'),
          ephemeral: true,
        })
    }
  }
}
