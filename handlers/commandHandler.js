async function loadCommands(client) {
  const { loadFiles } = require("../functions/utils/fileLoader")
  const ascii = require("ascii-table")

  const table = new ascii().setHeading("Commands", "Status")

  await client.commands.clear()
  await client.subCommands.clear()

  const commandsArray = []

  const files = await loadFiles("commands")
  files.forEach((fileObject) => {
    const command = require(fileObject.file)

    if (command.subCommand) {
      return client.subCommands.set(command.subCommand, command)
    }

    client.commands.set(command.data.name, { ...command, category: fileObject.parentDir })

    commandsArray.push(command.data.toJSON())

    table.addRow(command.data.name, "🟩")
  })

  client.application.commands.set(commandsArray)

  return console.log(table.toString(), "\n Loaded Commands.")
}

module.exports = { loadCommands }
