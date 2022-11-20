const dotenv = require("dotenv")

const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js")
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember } = Partials

const { loadEvents } = require("./handlers/eventHandler")

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
})

dotenv.config()

client.commands = new Collection()
client.subCommands = new Collection()
client.events = new Collection()

loadEvents(client)

client.login(process.env.TOKEN)
