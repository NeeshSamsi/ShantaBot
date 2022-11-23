const { ChatInputCommandInteraction } = require("discord.js")

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return

    const command = client.commands.get(interaction.commandName)

    if (!command) {
      return interaction.reply({ content: "This command is outdated.", ephemeral: true })
    }

    if (command.developer && interaction.user.id !== "308920733529276416") {
      return interaction.reply({ content: "This command is only available to my owner, Neesh", ephemeral: true })
    }

    const subCommandGroup = interaction.options.getSubcommandGroup(false)
    const subCommand = interaction.options.getSubcommand(false)
    if (subCommand) {
      let filePath

      if (subCommandGroup) {
        filePath = `${interaction.commandName} ${subCommandGroup} ${subCommand}`
      } else {
        filePath = `${interaction.commandName} ${subCommand}`
      }

      const subCommandFile = client.subCommands.get(filePath)

      console.log(filePath)

      if (!subCommandFile) return interaction.reply({ content: "This subcommand is outdated.", ephemeral: true })

      subCommandFile.execute(interaction, client)
    } else {
      command.execute(interaction, client)
    }
  },
}
