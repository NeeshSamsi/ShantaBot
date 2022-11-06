const { ChatInputCommandInteraction, SlashCommandBuilder, Events } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sim")
    .setDescription("Simulate Events for Testing.")
    .addStringOption((option) =>
      option
        .setName("event")
        .setDescription("Specify event to simulate.")
        .addChoices(
          { name: Events.GuildMemberAdd, value: Events.GuildMemberAdd },
          { name: Events.GuildMemberRemove, value: Events.GuildMemberRemove }
        )
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const event = interaction.options.getString("event")

    try {
      switch (event) {
        case Events.GuildMemberAdd:
          interaction.client.emit(event, interaction.user)
          break
      }

      interaction.reply({
        content: `Successfully emitted ${event}`,
        ephemeral: true,
      })
    } catch (err) {
      console.error(err)
    }
  },
}
