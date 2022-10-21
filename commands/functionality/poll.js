module.exports = {
  commands: "poll",
  expectedArgs: "<optional emoji> <optional emoji>",
  permissionError: "You do not have permission to run this command.",
  minArgs: 0,
  maxArgs: null,
  callback: async (message, arguments, text) => {
    let defaultReactions = ['👍', '👎']

    await message.delete()

    targetMsg = await message.channel.messages.fetch({ limit: 1 })

    const addReactions = (reactions) => {
      targetMsg.first().react(`${reactions[0]}`)
      reactions.shift()

      if(reactions.length > 0){
        setTimeout(() => {
          addReactions(reactions)
        }, 750);
      }
    }

    if(arguments.length === 0){
      addReactions(defaultReactions)
    } else {
      let customReactions = arguments
      addReactions(customReactions)
    }
  },
  permissions: [],
  requiredRoles: [],
};