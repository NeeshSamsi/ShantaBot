const path = require("node:path")
const { glob } = require("glob")
const { promisify } = require("util")

const proGlob = promisify(glob)

async function loadFiles(dir) {
  const files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/${dir}/**/*.js`)

  files.forEach((file) => {
    delete require.cache[require.resolve(file)]
  })

  filesObject = files.map((file) => {
    const filePath = file.split("/")

    return { file, filePath }
  })

  return filesObject
}

module.exports = { loadFiles }
