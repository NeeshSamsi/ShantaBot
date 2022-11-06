const { Events, Client } = require("discord.js")
const updateMemberCount = require("../../functions/discord/updateMemberCount")

module.exports = {
  name: Events.GuildMemberRemove,
  /**
   *
   * @param {Client} client
   */
  async execute(user, client) {
    updateMemberCount(client)
  },
}
