import { SlashCommandBuilder } from "discord.js"

export default {
  data: new SlashCommandBuilder().setName("hello").setDescription("Politely responds with Hello"),
  execute: async (interaction) => {
    await interaction.reply("Hello!")
  },
}
