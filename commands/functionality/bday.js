import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  commands: ["birthday", "bday"],
  description: "Forgot what that does tbh.",
  expectedArgs: "<optional name> \n (Names: 'Pattu', 'Shan', 'Sem', 'Ishrat', 'Chakku', 'Neesh')",
  permissionError: "You do not have permission to run this command.",
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, args, text) => {
    const bdayFilePath = __dirname.replace("\\commands\\functionality", "") + "\\birthday.js"
    const birthday = await import(bdayFilePath)

    const now = new Date()
    const bdaysData = [
      {
        name: "Pattu",
        birthdate: new Date(`November 22, ${now.getFullYear()} 00:00:00`),
        birthyear: 2004,
      },
      {
        name: "Shan",
        birthdate: new Date(`October 25, ${now.getFullYear()} 00:00:00`),
        birthyear: 2004,
      },
      {
        name: "Sem",
        birthdate: new Date(`March 17, ${now.getFullYear()} 00:00:00`),
        birthyear: 2005,
      },
      {
        name: "Ishrat",
        birthdate: new Date(`November 18, ${now.getFullYear()} 00:00:00`),
        birthyear: 2004,
      },
      {
        name: "Chakku",
        birthdate: new Date(`February 21, ${now.getFullYear()} 00:00:00`),
        birthyear: 2005,
      },
      {
        name: "Neesh",
        birthdate: new Date(`June 18, ${now.getFullYear()} 00:00:00`),
        birthyear: 2004,
      },
    ]

    if (args.length === 0) {
      const bdayObject = birthday.getClosest(bdaysData, now)
      const daysLeft = birthday.getCountdown(bdayObject.birthdate - now) + 1
      console.log(daysLeft)

      if (daysLeft !== 1) {
        message.channel.send(`There are ${daysLeft} days left for ${bdayObject.name}'s Birthday!`)
      } else {
        message.channel.send(`Tomorrow is ${bdayObject.name}'s Birthday!`)
      }
    } else {
      const bdayObject = bdaysData.find((obj) => obj.name.toLowerCase() === args[0].toLowerCase())
      if (bdayObject) {
        const daysLeft = birthday.getCountdown(bdayObject.birthdate - now) + 1
        if (daysLeft !== 1) {
          message.channel.send(`There are ${daysLeft} days left for ${bdayObject.name}'s Birthday!`)
        } else {
          message.channel.send(`Tomorrow is ${bdayObject.name}'s Birthday!`)
        }
      } else {
        message.channel.send(
          `${args[0]} is not part of the data, please use 'Pattu', 'Shan', 'Sem', 'Ishrat', 'Chakku', 'Neesh'`
        )
      }
    }
  },
  permissions: [],
  requiredRoles: [],
}
