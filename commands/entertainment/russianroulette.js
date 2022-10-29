export default {
  commands: ["russianroulette", "rr"],
  description: "Play Russian Roulette. Do you trust your luck?",
  expectedArgs: "",
  permissionError: "You do not have permission to run this command.",
  minArgs: 0,
  maxArgs: 0,
  callback: (message, args, text) => {
    const getChance = () => {
      if (Math.round(Math.random() * 100) / 100 <= 0.16) {
        return true
      } else {
        return false
      }
    }
    const chance = getChance()

    message.channel.send("https://tenor.com/view/russian-roulette-gun-gif-24197229")

    setTimeout(function () {
      message.channel.send(
        "https://tenor.com/view/link-neal-roulette-rhett-and-link-gmm-good-mythical-morning-gif-11514249"
      )
    }, 4000)

    setTimeout(function () {
      if (chance) {
        message.channel.send("https://tenor.com/view/pull-the-trigger-fire-pistol-bullet-shoot-gif-14079588")
      } else {
        message.channel.send(
          "https://tenor.com/view/bubbles-home-alone-kevin-mccallister-macaulay-culkin-fake-gun-gif-17318176"
        )
      }
    }, 8000)
  },
  permissions: [],
  requiredRoles: [],
}
