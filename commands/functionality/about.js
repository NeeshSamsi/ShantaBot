const fs = require("node:fs")

const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js")

const capitalize = require("../../functions/capitalize")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Gives some information about Shanta and lists all available commands."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const helpEmbed = new EmbedBuilder()
      .setColor("White")
      .setTitle("Hi, I am Shanta Bai.")
      .setDescription(
        "I am the brain child of Neeshツ. I was forged by his intellect in desperate times to fill the void in his heart and bring purpose to his server."
      )
      .setThumbnail(client.user.avatarURL())
      .setFooter({ text: "To use any of these commands, type /.", iconURL: client.user.avatarURL() })

    const commands = {}

    client.commands.forEach((command, commandName) => {
      if (commandName === "reload") return

      const { name, description } = command.data
      const { category } = command

      if (commands[category]) {
        commands[category] = [...commands[category], { name, description }]
      } else {
        commands[category] = [{ name, description }]
      }
    })

    for (const category in commands) {
      const categoryDescription = fs
        .readFileSync(`${process.cwd().replace(/\\/g, "/")}/commands/${category}/description.txt`)
        .toString()

      helpEmbed.addFields({ name: capitalize(category), value: categoryDescription })

      for (const command of commands[category]) {
        helpEmbed.addFields({ name: `/${command.name}`, value: command.description, inline: true })
      }
    }

    interaction.reply({ embeds: [helpEmbed] })
  },
}
