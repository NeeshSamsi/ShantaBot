const { ChatInputCommandInteraction } = require("discord.js")

const { getXataClient } = require("../../../lib/xata")

const xata = getXataClient()

module.exports = {
  subCommand: "set membercountchannel",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const guildID = interaction.guild.id
    const memberCountChannel = interaction.options.getChannel("countchannel")

    try {
      await xata.db.Guild.createOrUpdate(guildID, { memberCountChannel: memberCountChannel.id })

      interaction.reply(`Successfully set ${interaction.guild.name}'s Member Count channel.`)
    } catch (err) {
      console.error(err)
      interaction.reply({ content: "An error occurred while adding/updating the channel.", ephemeral: true })
    }
  },
}
