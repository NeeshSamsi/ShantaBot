export default {
  commands: "poll",
  description: "Create a poll with 2 emoji reactions",
  expectedArgs: "<optional emoji> <optional emoji>",
  permissionError: "You do not have permission to run this command.",
  minArgs: 0,
  maxArgs: null,
  callback: async (message, args, text) => {
    let defaultReactions = ["👍", "👎"]

    await message.delete()

    targetMsg = await message.channel.messages.fetch({ limit: 1 })

    const addReactions = (reactions) => {
      targetMsg.first().react(`${reactions[0]}`)
      reactions.shift()

      if (reactions.length > 0) {
        setTimeout(() => {
          addReactions(reactions)
        }, 750)
      }
    }

    if (args.length === 0) {
      addReactions(defaultReactions)
    } else {
      let customReactions = args
      addReactions(customReactions)
    }
  },
  permissions: [],
  requiredRoles: [],
}
