const { Client } = require("discord.js")
const { getXataClient } = require("../../lib/xata")

const xata = getXataClient()

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  const guilds = await xata.db.Guild.getAll()

  console.log(guilds)

  guilds.forEach(async ({ id, memberCountChannel }) => {
    const guild = await client.guilds.cache.get(id)
    const channel = guild.channels.cache.get(memberCountChannel)

    channel.setName(`Member Count: ${guild.memberCount}`)
  })
}
