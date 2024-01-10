const { Events, Client } = require("discord.js")

const getMessageLink = (message) => {
  const { id, channelId, guildId } = message

  return `https://discord.com/channels/${guildId}/${channelId}/${id}`
}

const generatePinMessage = ({ content, authorId, link }) =>
  `<@${authorId}> ${link}\n${content}\n·`

module.exports = {
  name: Events.ChannelPinsUpdate,
  /**
   *
   * @param {Client} client
   */
  async execute(channel, _, client) {
    // Check if it's Server 2.0
    if (channel.guildId !== "849545086718443520") return

    const server = await client.guilds.fetch("849545086718443520")
    const pinsChannel = await server.channels.fetch("1194319244519809054")
    const pinnedChannel = await server.channels.fetch(channel.id)
    const pinnedMessage = await pinnedChannel.messages.fetch(
      channel.lastMessageId
    )

    if (!pinnedMessage.pinned) return

    const { content, author, ...rest } = pinnedMessage

    const link = getMessageLink(pinnedMessage)
    const pinMessage = generatePinMessage({
      content,
      authorId: author.id,
      link,
    })

    if (pinMessage.length > 2000) {
      return pinnedChannel.send(
        `${link}\nThis message was unable to be processed because it was too big.\nThat's what .. nvm\n\nIt will remain pinned.`
      )
    }

    try {
      const success = await pinsChannel.send(pinMessage)
      await pinnedMessage.unpin()

      pinnedMessage.reply(
        `Cleaned up your shit once again.\nThis message was pinned here: ${getMessageLink(
          success
        )}`
      )
    } catch (error) {
      pinnedMessage.reply(
        "Something went wrong trying to process this message. It will remain pinned."
      )
    }
  },
}
