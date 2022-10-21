module.exports = (client) => {
  const channelId = "852842685232578580";

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId);
    channel.setName(`Members: ${guild.memberCount.toLocaleString()}`); // Locale String makes 1300 -> 1,300 for example

    client.on("guildMemberAdd", (member) => updateMembers(member.guild));
    client.on("guildMemberRemove", (member) => updateMembers(member.guild));

    // to update on start. Not needed
    const privateGuild = client.guilds.cache.get("739728442131611688");
    updateMembers(privateGuild);
  };
};
