const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, Client, ChannelType } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Need to settle an argument? Post a poll. (Add a channel or post to this channel)")
    .addStringOption((option) => option.setName("title").setDescription("Title of the poll.").setRequired(true))
    .addStringOption((option) =>
      option.setName("description").setDescription("Description of the poll.").setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel to post the poll.")
        .setRequired(false)
        .addChannelTypes(ChannelType.GuildText)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */ async execute(interaction, client) {
    const title = interaction.options.getString("title")
    const description = interaction.options.getString("description")
    const channel = interaction.options.getChannel("channel")
      ? interaction.options.getChannel("channel")
      : interaction.channel

    const pollEmbed = new EmbedBuilder()
      .setColor("White")
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
      .setTitle(title)
      .setDescription(description)
      .setFooter({ text: "To create your own poll, type /poll.", iconURL: client.user.avatarURL() })

    const poll = await channel.send({ embeds: [pollEmbed], fetchReply: true })

    interaction.reply({ content: `Successfully posted Poll - ${title} to ${channel}`, ephemeral: true })

    poll.react("✅")
    poll.react("❎")
  },
}
