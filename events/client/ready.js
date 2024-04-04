const { Client, Events, ActivityType } = require("discord.js")
const { loadCommands } = require("../../handlers/commandHandler")
const youtubeVideoNotification = require("../../functions/youtubeVideoNotification")

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

    client.user.setActivity("something else", { type: ActivityType.Playing })

    // youtubeVideoNotification(client)
  },
}
