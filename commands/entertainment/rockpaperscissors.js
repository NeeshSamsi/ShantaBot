function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default {
  commands: ["rockpaperscissors", "rps"],
  description: "Play Rock Paper Scissors with me.",
  expectedArgs: "<option: Rock, Paper or Scissors>",
  minArgs: 1,
  maxArgs: 1,
  callback: (message, args, text) => {
    const argument = args[0].toLowerCase()

    const random = getRandomInt(0, 2)

    const options = ["rock", "paper", "scissors"]

    const response = options[random]

    if (!options.includes(argument)) {
      message.reply("Incorrect option, use 'Rock', 'Paper' or 'Scissors'")
    }

    switch (argument) {
      case options[0]:
        if (response === "scissors") message.reply("Scissors\nYou win!")
        if (response === "paper") message.reply("Paper\nYou lose.")
        if (response === "rock") message.reply("Rock\nIt's a draw")
        break
      case options[1]:
        if (response === "rock") message.reply("Rock\nYou win!")
        if (response === "scissors") message.reply("Scissors\nYou lose.")
        if (response === "paper") message.reply("Paper\nIt's a draw")
        break
      case options[2]:
        if (response === "rock") message.reply("Rock\nYou win!")
        if (response === "paper") message.reply("Paper\nYou lose.")
        if (response === "scissors") message.reply("Scissors\nIt's a draw")
        break
      default:
        break
    }
  },
}
