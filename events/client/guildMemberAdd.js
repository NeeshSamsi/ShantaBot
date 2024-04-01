const { Events, Client } = require("discord.js")
const updateMemberCount = require("../../functions/updateMemberCount")

module.exports = {
  name: Events.GuildMemberAdd,
  /**
   *
   * @param {Client} client
   */
  async execute(user, client) {
    updateMemberCount(client)
  },
}
