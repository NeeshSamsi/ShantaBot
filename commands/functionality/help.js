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
        }
      }
    }

    readCommands(path.join(__dirname, ".."))

    const commands = allCommands.map((command) => {
      return {
        name: command.commands,
        description: command.description,
        expectedArgs: command.expectedArgs,
      }
    })

    const commandToString = (commandArray) => {
      if (!commandArray) return
      if (typeof commandArray === "string") {
        return commandArray
      } else {
        return commandArray.join(" / ")
      }
    }

    const helpMessage = `\n\n**List of available commands :**\n\n${commands
      .map((command) => `**${commandToString(command.name)}**: \n${command.description}`)
      .join("\n\n")}\n\nFor specific information try: <@785469565227630592> help <command>`

    const getSpecificHelpMessage = (command) => {
      return `\n\`${commandToString(command.name)}\`\n**Description: **${
        command.description
      }\n**Usage: **<@785469565227630592> ${commandToString(command.name)} ${
        command.expectedArgs ? command.expectedArgs : ""
      }`
    }

    if (arguments[0]) {
      const specificCommand = commands.filter((command) => {
        if (typeof command.name === "string") {
          return command.name === arguments[0]
        } else {
          for (const name of command.name) {
            return name === arguments[0]
          }
        }
      })[0]

      if (!specificCommand) {
        message.reply("That command does not exist. Try: <@785469565227630592> help for a list of available commands.")
      } else {
        message.reply(getSpecificHelpMessage(specificCommand))
      }
    } else {
      message.reply(helpMessage)
    }
  },
  permissions: [],
  requiredRoles: [],
}