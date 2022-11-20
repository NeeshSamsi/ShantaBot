const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload the Commands/Events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options.setName("events").setDescription("Reload the events."))
    .addSubcommand((options) => options.setName("commands").setDescription("Reload the commands.")),
}
