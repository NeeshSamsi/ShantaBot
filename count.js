module.exports = (client) => {
  const channelId = "1032935088536694845"

  client.on("message", (message) => {
    // console.log(message.channel)
    if (message.channel.id === channelId) {
      if (isNaN(Number(message.content))) {
        return
      } else if (message.author.id === "785469565227630592") {
        return
      } else {
        setTimeout(() => {
          message.channel.send(Number(message.content) + 1)
        }, 1500)
      }
    }
  })
}
