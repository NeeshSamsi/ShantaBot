module.exports = {
  commands: ["ban"],
  expectedArgs: "<@user> <reason>",
  permissionError: "You need Admin permission to run this command.",
  minArgs: 2,
  maxArgs: null,
  callback: (message, arguments, text) => {
    const { guild, author } = message
    const reason = text.replace(`${arguments[0]} `, '')
    const targetUserId = arguments[0].replace(/[\\<>@#&!]/g, "")
    const targetUser = message.guild.members.cache.get(targetUserId)
    
    const dmMsg = `<@${targetUserId}> you been banned from ${guild.name} for ${reason}`

    const banEmbed = {
      color: 0xffff00,
      title: 'Successfully Banned',
      author: {
        name: author.username,
        icon_url: author.displayAvatarURL()
      },
      thumbnail: {
        url: guild.iconURL()
      },
      fields: [
        {
          name: '\u200b',
          value: '\u200b',
          inline: false
        },
        {
          name: 'Banned User',
          value: `${targetUser}`,
          inline: false
        },
        {
          name: 'Reason:',
          value: `${reason}`,
          inline: false
        },
        {
          name: '\u200b',
          value: '\u200b',
          inline: false
        },
      ],
      timestamp: new Date(),
      footer: {
        text: `${message.client.user.username} sab saaf karegi`,
        icon_url: message.client.user.displayAvatarURL()
      }
    }

    targetUser.send(dmMsg)
    message.channel.send({embed: banEmbed})

    targetUser.ban()
  },
  permissions: ['ADMINISTRATOR'],
  requiredRoles: [],
};