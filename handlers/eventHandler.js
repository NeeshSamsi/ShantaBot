async function loadEvents(client) {
  const { loadFiles } = require("../functions/utils/fileLoader")

  const ascii = require("ascii-table")
  const table = new ascii().setHeading("Events", "Status")

  await client.events.clear()

  const files = await loadFiles("events")
  files.forEach((fileObject) => {
    const event = require(fileObject.file)

    const execute = (...args) => event.execute(...args, client)

    client.events.set(event.name, execute)

    if (event.rest) {
      if (event.once) client.rest.once(event.name, execute)
      else client.rest.on(event.name, execute)
    } else {
      if (event.once) client.once(event.name, execute)
      else client.on(event.name, execute)
    }

    table.addRow(event.name, "🟩")
  })

  return console.log(table.toString(), "\n Loaded Events.")
}

module.exports = { loadEvents }
