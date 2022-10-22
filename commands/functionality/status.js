module.exports = {
  commands: ["status"],
  description: "Set my status, by default: PLAYING you",
  expectedArgs: "<optional type (watching / listening / playing / streaming)> <status text>",
  permissionError: "You do not have permission to run this command.",
  minArgs: 1,
  maxArgs: null,
  callback: (message, arguments, text) => {
    const activityTypes = ["WATCHING", "LISTENING", "PLAYING", "STREAMING"]
    let activityType = "PLAYING"
    let content = text

    for (const actType of activityTypes) {
      if (arguments[0].toUpperCase() === actType) {
        activityType = actType
        console.log(activityType)
        content = text.replace(`${arguments[0]} `, "")
      }
    }
    message.client.user.setActivity(content, { type: activityType })
  },
  permissions: [],
  requiredRoles: [],
}
