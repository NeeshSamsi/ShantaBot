const path = require("path")
const fs = require("fs")
const Discord = require("discord.js")
const allIntents = new Discord.Intents(32767)
const client = new Discord.Client({
  intents: allIntents,
})

const config = require("./config.json")

const birthday = require("./birthday")
const memberCount = require("./memberCount")
const count = require("./count")

client.on("ready", async () => {
  console.log("The client is ready!")

  const baseFile = "command-base.js"
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))

      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const options = require(path.join(__dirname, dir, file))
        commandBase(options)
      }
    }
  }

  readCommands("commands")

  commandBase.listen(client)

  client.user.setActivity("you", { type: "PLAYING" })

  birthday.isBdayToday(client)
  memberCount(client)
  count(client)
})

client.login(config.token)
