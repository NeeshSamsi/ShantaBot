export default (client) => {
  const channelId = "1032935088536694845"

  client.on("message", (message) => {
    console.log(message.content)

    if (message.channel.id !== channelId) {
      return
    }
    if (isNaN(Number(message.content))) {
      return
    }
    if (message.author.id === "785469565227630592") {
      return
    }

    setTimeout(() => {
      message.channel.send(Number(message.content) + 1)
    }, 1000)
  })
}
