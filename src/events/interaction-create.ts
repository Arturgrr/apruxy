import BaseCommand from '@/structs/base-command'
import BaseEvent from '@/structs/base-event'
import { Events, Interaction } from 'discord.js'

export default class InteractionCreateEvent extends BaseEvent {
  public static eventName = Events.InteractionCreate
  public static once = true

  public async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return

    const command = this.client.commands.get(interaction.commandName)

    if (!command) return

    try {
      this.client.db.user
        .findUnique({ where: { id: parseInt(interaction.user.id) } })
        .then(async (user) => {
          if (user) {
            await this.client.db.user.update({
              where: { id: parseInt(interaction.user.id) },
              data: {
                commandsCounter: user.commandsCounter + 1,
              },
            })
          } else {
            console.log('Creating new user')
            await this.client.db.user.create({
              data: {
                id: parseInt(interaction.user.id),
                commandsCounter: 1,
              },
            })
            console.log('Created new user')
          }
        })

      await (command as BaseCommand).execute(interaction)
    } catch (e) {
      console.error(e)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        })
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        })
      }
    }
  }
}
