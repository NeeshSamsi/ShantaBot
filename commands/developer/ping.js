const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Simply reponds with Pong!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    interaction.reply({ content: "Pong!", ephemeral: true })
  },
}
