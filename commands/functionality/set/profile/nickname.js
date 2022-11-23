const { ChatInputCommandInteraction } = require("discord.js")

const { getXataClient } = require("../../../../lib/xata")

const xata = getXataClient()

module.exports = {
  subCommand: "set profile nickname",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const nickname = interaction.options.getString("nickname")

    const guildID = interaction.guildId
    const userID = interaction.user.id

    try {
      await xata.db.Profile.createOrUpdate(`g${guildID}u${userID}`, {
        nickname,
        guildID,
        userID,
      })

      interaction.reply(`Successfully set your nickname to ${nickname}`)
    } catch (err) {
      console.error(err)
      interaction.reply({
        content: "An error occurred while creating/updating the your profile nickname.",
        ephemeral: true,
      })
    }
  },
}
