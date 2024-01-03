import { translator } from '@/langs'
import BaseCommand from '@/structs/base-command'
import {
  dailySubCommand,
  sendSubCommand,
  seeSubCommand,
} from '@/subcommands/shells'
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandNumberOption,
  SlashCommandSubcommandBuilder,
  SlashCommandUserOption,
} from 'discord.js'

export default class ShellsCommand extends BaseCommand {
  public static data: SlashCommandBuilder = <SlashCommandBuilder>(
    new SlashCommandBuilder()
      .setName('shells')
      .setNameLocalizations({
        'pt-BR': 'conchas',
      })
      .setDescription('Some economy commands')
      .setDescriptionLocalizations({
        'pt-BR': 'Alguns comandos de economia',
      })
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('see')
          .setNameLocalizations({
            'pt-BR': 'ver',
          })
          .setDescription('See how many shells you or other people have')
          .setDescriptionLocalizations({
            'pt-BR': 'Veja quantas conchas você ou outras pessoas tem',
          })
          .addUserOption(
            new SlashCommandUserOption()
              .setName('user')
              .setNameLocalizations({
                'pt-BR': 'usuário',
              })
              .setDescription('The user to see how many shells they have')
              .setDescriptionLocalizations({
                'pt-BR': 'O usuário para ver quantos conchas ele tem',
              })
              .setRequired(false),
          ),
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('daily')
          .setNameLocalizations({
            'pt-BR': 'diário',
          })
          .setDescription('Get your daily shells')
          .setDescriptionLocalizations({
            'pt-BR': 'Pegue suas conchas diárias',
          }),
      )
      .addSubcommand(
        new SlashCommandSubcommandBuilder()
          .setName('send')
          .setNameLocalizations({
            'pt-BR': 'enviar',
          })
          .setDescription('Send shells to other people')
          .setDescriptionLocalizations({
            'pt-BR': 'Envie conchas para outras pessoas',
          })
          .addUserOption(
            new SlashCommandUserOption()
              .setName('user')
              .setNameLocalizations({
                'pt-BR': 'usuário',
              })
              .setDescription('The user to send conchs')
              .setDescriptionLocalizations({
                'pt-BR': 'O usuário para enviar conchas',
              })
              .setRequired(true),
          )
          .addNumberOption(
            new SlashCommandNumberOption()
              .setName('amount')
              .setNameLocalizations({
                'pt-BR': 'quantidade',
              })
              .setDescription('The amount of conchs to send')
              .setDescriptionLocalizations({
                'pt-BR': 'A quantidade de conchas para enviar',
              })
              .setRequired(true),
          ),
      )
  )

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const txt = translator.getFixedT(interaction.locale)

    switch (interaction.options.getSubcommand()) {
      case 'see':
        await seeSubCommand(interaction, this.client)
        break
      case 'daily':
        await dailySubCommand(interaction, this.client)
        break
      case 'send':
        await sendSubCommand(interaction, this.client)
        break
      default:
        interaction.reply({
          content: txt('botClient.invalidInteraction'),
          ephemeral: true,
        })
        break
    }
  }
}
