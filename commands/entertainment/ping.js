module.exports = {
  commands: "ping",
  description: 'Simply replies with "Pong!"',
  minArgs: 0,
  maxArgs: 0,
  callback: (message, arguments, text) => {
    message.reply("Pong!")
  },
}
