const { ChatInputCommandInteraction, SlashCommandBuilder, ActivityType } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Set Shanta's Activity Status.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Status type.")
        .setChoices(
          { name: "Playing", value: ActivityType[ActivityType.Playing] },
          { name: "Watching", value: ActivityType[ActivityType.Watching] },
          { name: "Listening", value: ActivityType[ActivityType.Listening] },
          { name: "Streaming", value: ActivityType[ActivityType.Streaming] },
          { name: "Competing", value: ActivityType[ActivityType.Competing] }
        )
        .setRequired(true)
    )
    .addStringOption((option) => option.setName("text").setDescription("Status text").setRequired(true)),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const typeInput = interaction.options.getString("type")
    const type = ActivityType[typeInput]
    const text = interaction.options.getString("text")

    interaction.client.user.setActivity(text, { type })

    interaction.reply(`Successfully set ${interaction.client.user.username}'s status to '${typeInput} ${text}'.`)
  },
}
