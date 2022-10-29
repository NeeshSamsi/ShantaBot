export default {
  commands: "ping",
  description: 'Simply replies with "Pong!"',
  minArgs: 0,
  maxArgs: 0,
  callback: (message, args, text) => {
    message.reply("Pong!")
  },
}
