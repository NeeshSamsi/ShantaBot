const { SlashCommandBuilder, ChannelType } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set")
    .setDescription("Set various server information.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("membercountchannel")
        .setDescription("Add/Update the Server Member Count channel.")
        .addChannelOption((option) =>
          option
            .setName("countchannel")
            .setDescription("The channel that displays the Member Count")
            .addChannelTypes(ChannelType.GuildVoice)
            .setRequired(true)
        )
    )
    .addSubcommandGroup((group) =>
      group
        .setName("profile")
        .setDescription("Set your profile parameters.")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("birthday")
            .setDescription("Set your birthday so Shanta can wish you. (Format: DD-MM-YYY)")
            .addIntegerOption((option) =>
              option.setName("day").setDescription("Day of the month.").setMaxValue(31).setRequired(true)
            )
            .addIntegerOption((option) =>
              option
                .setName("month")
                .setDescription("Enter your birth month.")
                .setChoices(
                  { name: "January", value: 1 },
                  { name: "February", value: 2 },
                  { name: "March", value: 3 },
                  { name: "April", value: 4 },
                  { name: "May", value: 5 },
                  { name: "June", value: 6 },
                  { name: "July", value: 7 },
                  { name: "August", value: 8 },
                  { name: "September", value: 9 },
                  { name: "October", value: 10 },
                  { name: "November", value: 11 },
                  { name: "December", value: 12 }
                )
                .setRequired(true)
            )
            .addIntegerOption((option) => option.setName("year").setDescription("Enter your birth year."))
        )
    ),
}
