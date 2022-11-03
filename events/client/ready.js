const { loadCommands } = require("../../handlers/commandHandler")

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("\nThe client is now ready.\n")

    loadCommands(client)
  },
}
