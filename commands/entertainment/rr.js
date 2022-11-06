const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")

const getRandomInt = require("../../functions/utils/getRandomInt")

module.exports = {
  data: new SlashCommandBuilder().setName("rr").setDescription("Play Russian Roulette. Do you trust your luck?"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    const chance = getRandomInt(1, 6) === 1

    interaction.reply("https://tenor.com/view/russian-roulette-gun-gif-24197229")

    setTimeout(() => {
      interaction.channel.send("https://tenor.com/view/breaking-bad-aaron-paul-jesse-pinkman-sad-tears-gif-15925597")
    }, 4000)

    setTimeout(() => {
      if (chance) {
        interaction.channel.send("https://tenor.com/view/pull-the-trigger-fire-pistol-bullet-shoot-gif-14079588")
      } else {
        interaction.channel.send(
          "https://tenor.com/view/bubbles-home-alone-kevin-mccallister-macaulay-culkin-fake-gun-gif-17318176"
        )
      }
    }, 8000)
  },
}
