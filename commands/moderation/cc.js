const { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cc")
    .setDescription("Clear channel ... Not really.\nDelete number of messages.")
    .addIntegerOption((option) =>
      option.setName("number").setDescription("Enter the number of messages to be deleted").setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Select which channel to delete messages from.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const amount = interaction.options.getInteger("number")
    const channelInput = interaction.options.getChannel("channel")

    const channel = channelInput ? channelInput : interaction.channel

    await channel.bulkDelete(amount)
    const reply = await interaction.reply({
      content: `Deleted ${amount} message${amount > 1 ? "s" : ""}.\nShanta Bai sab saaf karegi`,
      fetchReply: true,
    })
    const msg = await channel.messages.fetch(reply.id)
    setTimeout(() => {
      msg.delete()
    }, 2000)
  },
}
