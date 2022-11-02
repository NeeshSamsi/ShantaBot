import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { Client, Collection, Events, GatewayIntentBits } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
})

client.commands = new Collection()

const commandsPath = path.join(__dirname, "commands")

const readCommands = (dir) => {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)

    const stat = fs.lstatSync(filePath)

    if (stat.isDirectory()) {
      readCommands(filePath)
    } else {
      const command = import(filePath)

      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
      } else {
        // console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`)
      }
    }
  }
}

readCommands(commandsPath)

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Bot ready! Logged in as ${c.user.tag}`)
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand) return

  console.log(interaction)

  const command = interaction.client.commands.get(interaction.commandName)

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
  }

  try {
    await command.execute(interaction)
  } catch (err) {
    console.error(err)
    await interaction.reply({ content: "There was an error while executing this command", ephemeral: true })
  }
})

// Log in to Discord with your client's token
client.login(process.env.TOKEN)
