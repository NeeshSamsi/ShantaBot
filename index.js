import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import dotenv from "dotenv"
import Discord from "discord.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const allIntents = new Discord.Intents(32767)
const client = new Discord.Client({
  intents: allIntents,
})

import { isBdayToday } from "./birthday.js"
import memberCount from "./memberCount.js"
import count from "./count.js"

client.on("ready", async () => {
  console.log("The client is ready!")

  const baseFile = "command-base.js"
  const commandBase = await import(path.join(__dirname, "commands", baseFile))

  console.log(path.join(__dirname, "commands", baseFile), commandBase)

  const readCommands = async (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))

      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const options = await import(path.join(__dirname, dir, file))
        commandBase.register(options)
      }
    }
  }

  readCommands("commands")

  commandBase.listen(client)

  client.user.setActivity("you", { type: "PLAYING" })

  isBdayToday(client)
  memberCount(client)
  count(client)
})

client.login(process.env.TOKEN)
