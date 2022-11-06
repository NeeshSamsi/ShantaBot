const { Client } = require("discord.js")
const prisma = require("../../prisma/client")

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  const guilds = await prisma.guild.findMany()

  guilds.forEach(async ({ id, memberCountChannel }) => {
    const guild = await client.guilds.cache.get(id)
    const channel = guild.channels.cache.get(memberCountChannel)

    channel.setName(`Member Count: ${guild.memberCount}`)
  })
}
