module.exports = {
  commands: ["serverinfo", "info"],
  expectedArgs: "",
  permissionError: "You do not have permission to run this command.",
  minArgs: 0,
  maxArgs: 0,
  callback: (message, arguments, text) => {
    const { guild } = message

    const { name, region, memberCount, owner } = guild
    const iconUrl = guild.iconURL()

    const infoEmbed = {
      title: `Server Information for ${name}`,
      author: {
        name: message.client.user.username,
        icon_url: message.client.user.displayAvatarURL(),
        url: 'https://github.com/NeeshSamsi/ShantaBot'
      },
      thumbnail: {
        url: iconUrl
      },
      fields: [
        {
          name: '\u200b',
          value: '\u200b',
        },
        {
          name: "Region",
          value: region,
        },
        {
          name: "Member Count",
          value: memberCount,
        },
        {
          name: "Owner",
          value: owner.user.tag,
        }
      ],
    }

    message.channel.send({embed: infoEmbed})
  },
  permissions: [],
  requiredRoles: [],
};