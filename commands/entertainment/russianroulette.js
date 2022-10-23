module.exports = {
  commands: ["russianroulette", "rr"],
  description: "Play Russian Roulette. Do you trust your luck?",
  expectedArgs: "",
  permissionError: "You do not have permission to run this command.",
  minArgs: 0,
  maxArgs: 0,
  callback: (message, arguments, text) => {
    const chance = Math.floor(Math.random() * (5 + 1))

    console.log(chance)

    message.channel.send("https://tenor.com/view/gun-reload-bullet-revolver-gif-16173684")

    setTimeout(function () {
      message.channel.send(
        "https://tenor.com/view/link-neal-roulette-rhett-and-link-gmm-good-mythical-morning-gif-11514249"
      )
    }, 2000)

    setTimeout(function () {
      if (chance === 1) {
        message.channel.send("https://tenor.com/view/kermit-shoot-lol-gun-frog-gif-16181496")
      } else {
        message.channel.send(
          "https://tenor.com/view/bubbles-home-alone-kevin-mccallister-macaulay-culkin-fake-gun-gif-17318176"
        )
      }
    }, 4000)
  },
  permissions: [],
  requiredRoles: [],
}
