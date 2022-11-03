const { ChatInputCommandInteraction, Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js")

const getRandomInt = require("../../functions/getRandomInt")
const capitalize = require("../../functions/capitalize")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Play Rock, Paper, Scissors with me.")
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("Choose your option")
        .setRequired(true)
        .setChoices(
          { name: "Rock", value: "rock" },
          { name: "Paper", value: "paper" },
          { name: "Scissors", value: "scissors" }
        )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const choice = interaction.options.getString("choice")
    const random = getRandomInt(0, 2)
    const options = ["rock", "paper", "scissors"]
    const response = options[random]

    const sendResponse = (outcome) => {
      let responseText
      switch (outcome) {
        case "win":
          responseText = "You win!"
          break
        case "lose":
          responseText = "You lose."
          break
        case "draw":
          responseText = "It's a draw."
          break
      }

      const responseEmbed = new EmbedBuilder()
        .setColor("White")
        .addFields(
          { name: "You chose:", value: capitalize(choice), inline: true },
          { name: "I chose:", value: capitalize(response), inline: true },
          { name: responseText, value: "To play again, type /rps." }
        )
      interaction.reply({ embeds: [responseEmbed] })
    }

    switch (choice) {
      case options[0]:
        switch (response) {
          case "scissors":
            sendResponse("win")
            break
          case "paper":
            sendResponse("lose")
            break
          case "rock":
            sendResponse("draw")
            break
        }
        break
      case options[1]:
        switch (response) {
          case "rock":
            sendResponse("win")
            break
          case "scissors":
            sendResponse("lose")
            break
          case "paper":
            sendResponse("draw")
            break
        }
        break
      case options[2]:
        switch (response) {
          case "rock":
            sendResponse("win")
            break
          case "paper":
            sendResponse("lose")
            break
          case "scissors":
            sendResponse("draw")
            break
        }
        break
    }
  },
}
