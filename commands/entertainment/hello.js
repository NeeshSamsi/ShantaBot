const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder().setName("hello").setDescription("Come say Hello to your beloved Bai."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    interaction.reply({ content: "Hello." })
  },
}
