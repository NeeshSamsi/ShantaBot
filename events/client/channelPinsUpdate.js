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
    if (channel.guildId !== "849545086718443520") {
      console.log(`Pinned message in ${channel.name}`)
      return
    }

    const server = await client.guilds.fetch("849545086718443520")
    const pinsChannel = await server.channels.fetch("1194319244519809054")

    setTimeout(async () => {
      const allPinnedMessages = await channel.messages.fetchPinned()
      const pinnedMessage = allPinnedMessages.first()

      // Old pins don't get touched
      if (pinnedMessage.createdAt < new Date("2024-04-10")) {
        console.log("Old pinned message, ignoring")
        return
      }

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

        console.log(`Handled pinned message in ${channel.name}`)
      } catch (error) {
        pinnedMessage.reply(
          "Something went wrong trying to process this message. It will remain pinned."
        )
      }
    }, 500)
  },
}
