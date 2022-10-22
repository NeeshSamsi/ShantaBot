require("dotenv").config()

const PREFIXES = process.env.PREFIXES.split(",")

let prefix

const validatePermissions = (permissions) => {
  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOGS",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAME",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
    "USE_SLASH_COMMANDS",
    "REQUEST_TO_SPEAK",
    "MANAGE_THREADS",
    "USE_PUBLIC_THREADS",
    "USE_PRIVATE_THREADS",
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown Permission: ${permission}`)
    }
  }
}

const allCommands = {}

module.exports = (commandOptions) => {
  let { commands, permissions = [] } = commandOptions

  // Ensure commands and aliases are in an array
  if (typeof commands === "string") {
    commands = [commands]
  }

  console.log(`Registering command: "${commands[0]}"`)

  // Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === "string") {
      permissions = [permissions]
    }

    validatePermissions(permissions)
  }

  for (const command of commands) {
    allCommands[command] = {
      ...commandOptions,
      command,
      permissions,
    }
  }
}

module.exports.listen = (client) => {
  // Listen for messages
  client.on("message", (message) => {
    const { member, content, guild } = message

    console.log(message.content)

    for (thisPrefix of PREFIXES) {
      if (content.toLowerCase().startsWith(thisPrefix)) {
        prefix = thisPrefix
      }
    }

    // Split content and get args
    const arguments = content.split(/[ ]+/)

    // getting prefix + command
    const name = arguments.splice(0, 2).join(" ").toLowerCase()

    if (name.startsWith(prefix)) {
      const command = allCommands[name.replace(prefix, "")]
      if (!command) {
        return
      }

      const {
        permissions,
        permissionError = "You do not have permission to run this command.",
        requiredRoles = [],
        minArgs = 0,
        maxArgs = null,
        expectedArgs = "",
        callback,
      } = command

      // Command is to be run

      // Ensure user has required permissions
      for (const permission of permissions) {
        if (!member.hasPermission(permission)) {
          message.reply(permissionError)
          return
        }
      }

      // Ensure user has required roles
      for (const requiredRole of requiredRoles) {
        const role = guild.roles.cache.find((role) => role.name === requiredRole)

        if (!role || !member.roles.cache.has(role.id)) {
          message.reply(
            `You must have the "${requiredRole}" role or this role does not exist. Contact server Admins if you think this is a mistake.`
          )
          return
        }
      }

      // Ensure we have correct number or arguments
      if (arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
        message.reply(`Incorrect syntax! use ${name} ${expectedArgs}`)
        return
      }

      // Handle custom command code
      console.log("Running " + command)
      callback(message, arguments, arguments.join(" "))
    }
  })
}
