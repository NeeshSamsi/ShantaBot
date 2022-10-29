export default {
  commands: ["clearchannel", "cc"],
  description: "Deletes specified number of messages.",
  expectedArgs: "<no. of messages> <optional channel>",
  permissionError: "You need Admin permissions to run this command.",
  minArgs: 1,
  maxArgs: 2,
  callback: (message, args, text) => {
    const amount = parseInt(args[0])
    const channelArg = args[1]

    // message.guild.channels.cache.find()

    const delAmtMsgs = (amt, channel) => {
      channel.messages.fetch({ limit: amt }).then((results) => {
        channel.bulkDelete(results)
      })
    }

    if (!channelArg) {
      const targetChannel = message.channel
      delAmtMsgs(amount + 1, targetChannel)

      if (amount === 1) {
        targetChannel.send(`${amount} message deleted!`).then((message) => {
          setTimeout(() => {
            message.delete()
          }, 4000)
        })
      } else {
        targetChannel.send(`${amount} messages deleted!`).then((message) => {
          setTimeout(() => {
            message.delete()
          }, 4000)
        })
      }
    } else {
      channelId = channelArg.replace("<#", "").replace(">", "")
      console.log(message.guild.channels.cache.get(channelId) === message.channel)

      const targetChannel = message.guild.channels.cache.get(channelId)

      delAmtMsgs(1, message.channel)
      delAmtMsgs(amount, targetChannel)

      if (amount === 1) {
        targetChannel.send(`${amount} message deleted!`).then((message) => {
          setTimeout(() => {
            message.delete()
          }, 4000)
        })
      } else {
        targetChannel.send(`${amount} messages deleted!`).then((message) => {
          setTimeout(() => {
            message.delete()
          }, 4000)
        })
      }
    }
  },
  permissions: "ADMINISTRATOR",
  requiredRoles: [],
}
