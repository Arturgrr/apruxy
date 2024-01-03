import { translator } from '@/langs'
import BaseCommand from '@/structs/base-command'
import BaseEvent from '@/structs/base-event'
import { Events, Interaction } from 'discord.js'

export default class InteractionCreateEvent extends BaseEvent {
  public static eventName = Events.InteractionCreate
  public static once = false

  public async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return

    const command = this.client.commands.get(interaction.commandName)

    if (!command) return

    try {
      this.client.db.user
        .findUnique({ where: { id: interaction.user.id } })
        .then(async (user) => {
          if (user) {
            await this.client.db.user.update({
              where: { id: interaction.user.id },
              data: {
                commandsCounter: user.commandsCounter + 1,
              },
            })
          } else {
            await this.client.db.user.create({
              data: {
                id: interaction.user.id,
                commandsCounter: 1,
              },
            })
          }
        })

      if (interaction.guildId) {
        const id = interaction.guildId
        this.client.db.guild
          .findUnique({ where: { id } })
          .then(async (guild) => {
            if (guild) {
              await this.client.db.guild.update({
                where: { id },
                data: {
                  commandsCounter: guild.commandsCounter + 1,
                },
              })
            } else {
              await this.client.db.guild.create({
                data: {
                  id,
                  commandsCounter: 1,
                },
              })
            }
          })
      }

      await (command as BaseCommand).execute(interaction)
    } catch (e) {
      console.error(e)
      const txt = translator.getFixedT(interaction.locale)

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: txt('errorInCommand'),
          ephemeral: true,
        })
      } else {
        await interaction.reply({
          content: txt('errorInCommand'),
          ephemeral: true,
        })
      }
    }
  }
}
