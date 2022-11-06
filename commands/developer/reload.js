const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client } = require("discord.js")

const { loadCommands } = require("../../handlers/commandHandler")
const { loadEvents } = require("../../handlers/eventHandler")

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload the Commands/Events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options.setName("events").setDescription("Reload the events."))
    .addSubcommand((options) => options.setName("commands").setDescription("Reload the commands.")),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand()

    switch (subCommand) {
      case "events":
        {
          for (const [key, value] of client.events) {
            client.removeListener(`${key}`, value, true)
            loadEvents(client)
            interaction.reply({ content: "Reloaded events.", ephemeral: true })
          }
        }
        break
      case "commands":
        {
          loadCommands(client)
          interaction.reply({ content: "Reloaded commands.", ephemeral: true })
        }
        break
    }
  },
}
