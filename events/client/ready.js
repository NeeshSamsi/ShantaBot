const { Client, Events } = require("discord.js")
const { loadCommands } = require("../../handlers/commandHandler")

module.exports = {
  name: Events.ClientReady,
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    console.log("\nThe client is now ready.\n")

    loadCommands(client)
  },
}
