const fs = require("fs")
const path = require("path")

module.exports = {
  commands: "help",
  description: "Lists all available commands and their uses.",
  expectedArgs: "<command>",
  permissionError: "You do not have permission to run this command.",
  minArgs: 0,
  maxArgs: 1,
  callback: (message, arguments, text) => {
    const baseFile = "command-base.js"

    let allCommands = []

    const readCommands = (dir) => {
      const files = fs.readdirSync(dir)

      for (const file of files) {
        const stat = fs.lstatSync(path.join(dir, file))

        if (stat.isDirectory()) {
          readCommands(path.join(dir, file))
        } else if (file !== baseFile) {
          const options = require(path.join(dir, file))
          allCommands.push(options)
          console.log(options)
        }
      }
    }

    readCommands(path.join(__dirname, ".."))

    const commands = allCommands.map((command) => {
      return {
        name: typeof command.commands === "string" ? command.commands : command.commands.join(" / "),
        description: command.description,
        expectedArgs: command.expectedArgs,
      }
    })

    const helpMessage = commands.map((command) => `\n\n**${command.name}**: \n${command.description}`).join("\n")

    message.reply(helpMessage)
  },
  permissions: [],
  requiredRoles: [],
}
