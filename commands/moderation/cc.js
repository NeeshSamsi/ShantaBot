const { ChatInputCommandInteraction, SlashCommandBuilder, ChannelType, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cc")
    .setDescription("Clear channel... (Not really) Just delete some messages.")
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
  async execute(interaction) {
    const amount = interaction.options.getInteger("number")
    const channelInput = interaction.options.getChannel("channel")

    const channel = channelInput ? channelInput : interaction.channel

    try {
      await channel.bulkDelete(amount)
    } catch (err) {
      console.error(err)
      const errorEmbed = new EmbedBuilder()
        .setTitle("Error deleting messages : /cc")
        .setDescription(err.rawError.message)
      interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }

    const reply = await interaction.reply({
      content: `Deleted ${amount} message${amount > 1 ? "s" : ""} from ${channel}.\nShanta Bai sab saaf karegi!`,
      fetchReply: true,
    })
    const msg = await channel.messages.fetch(reply.id)
    setTimeout(() => {
      msg.delete()
    }, 3500)
  },
}
