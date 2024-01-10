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
    ),
}
