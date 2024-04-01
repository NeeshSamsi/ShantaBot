async function loadCommands(client) {
  const { loadFiles } = require("../utils/fileLoader")
  const ascii = require("ascii-table")

  const table = new ascii().setHeading("Commands", "Status")

  await client.commands.clear()
  await client.subCommands.clear()

  const commandsArray = []

  const files = await loadFiles("commands")
  files.forEach(({ file, filePath }) => {
    const command = require(file)

    if (command.subCommand) {
      if (command.subCommandGroup) {
        // Pop last - file name
        filePath.pop()
        // Pop 2nd last - subcommand group folder
        filePath.pop()
        // Pop 3rd last - subcommand folder
        filePath.pop()
        // Pop 4th last - category folder
        const category = filePath.pop()
        return client.subCommands.set(command.subCommand, {
          ...command,
          category,
        })
      }
      // Pop last - file name
      filePath.pop()
      // Pop 2nd last - subcommand folder
      filePath.pop()
      // Pop 3rd last - category folder
      const category = filePath.pop()
      return client.subCommands.set(command.subCommand, {
        ...command,
        category,
      })
    }

    // Pop last - file name
    filePath.pop()
    //Pop 2nd last - parent directory
    const category = command.execute ? filePath.pop() : null
    client.commands.set(command.data.name, { ...command, category })

    commandsArray.push(command.data.toJSON())

    table.addRow(command.data.name, "🟩")
  })

  client.application.commands.set(commandsArray)

  return console.log(table.toString(), "\n Loaded Commands.")
}

module.exports = { loadCommands }
