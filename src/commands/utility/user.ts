import { translator } from '@/langs'
import BaseCommand from '@/structs/base-command'
import { info } from '@/subcommands/user'
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandUserOption,
} from 'discord.js'

export default class UserCommand extends BaseCommand {
  public static data: SlashCommandBuilder = <SlashCommandBuilder>(
    new SlashCommandBuilder()
      .setName('user')
      .setDescription('A bunch of user commands')
      .setDescriptionLocalizations({
        'pt-BR': 'Um monte de comandos do usuário',
      })
      .addSubcommand((subcommand) =>
        subcommand
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
