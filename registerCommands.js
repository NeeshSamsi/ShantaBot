import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { REST, Routes } from "discord.js"
import dotenv from "dotenv"

dotenv.config()
const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_IDS = process.env.GUILD_IDS.split(",")

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commands = []

const commandsPath = path.join(__dirname, "commands")
const readCommands = (dir) => {
  const files = fs.readdirSync(dir)

  files.forEach(async (file) => {
    const filePath = path.join(dir, file)

    const stat = fs.lstatSync(filePath)

    if (stat.isDirectory()) {
      readCommands(filePath)
    } else {
      const command = await import(`file:///${filePath}`)

      console.log(command)

      if (command.data) {
        console.log(`Command: ${JSON.stringify(command)}`)
        commands.push(command.data.toJSON())
      } else {
        // console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`)
      }
    }
  })
}
readCommands(commandsPath)

console.log(commands)

const rest = new REST({ version: "10" }).setToken(TOKEN)

const register = async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`)

    for (const guildID of GUILD_IDS) {
      const data = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guildID), { body: commands })

      console.log(`Successfully refreshed ${data.length} application (/) commands for Guild ID: ${guildID}`)
    }
  } catch (err) {
    console.error(err)
  }
}
register()
