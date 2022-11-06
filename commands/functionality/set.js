const { SlashCommandBuilder, ChannelType, ChatInputCommandInteraction } = require("discord.js")

const prisma = require("../../prisma/client")

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
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand("membercount channel")

    switch (subcommand) {
      case "membercountchannel":
        const guildID = interaction.guild.id
        const memberCountChannel = interaction.options.getChannel("countchannel")

        try {
          await prisma.guild.upsert({
            where: { id: guildID },
            update: { memberCountChannel: memberCountChannel.id },
            create: {
              id: guildID,
              memberCountChannel: memberCountChannel.id,
            },
          })

          interaction.reply(`Successfully set ${interaction.guild.name}'s Member Count channel.`)
        } catch (err) {
          console.error(err)
          interaction.reply({ content: "An error occurred while adding/updating the channel.", ephemeral: true })
        }

        break
    }
  },
}
