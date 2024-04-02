const { Client } = require("discord.js")
const { getXataClient } = require("../lib/xata")
const Parser = require("rss-parser")

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  ytNotification(client)
}

async function ytNotification(client) {
  const xata = getXataClient()
  const parser = new Parser()

  const channels = await xata.db.LatestYouTubeVideo.getAll()

  channels.forEach(async (channel) => {
    // Get feed -> Get latest video
    // Compare latest video to current video
    // if new video, send message

    const { id, channelID, videoID } = channel

    const { title, items: videos } = await parser.parseURL(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`
    )

    if (!title || videos.length === 0) {
      console.error(
        `Failed to get youtube feed for channel: https://youtube.com/channel/${channelID}`
      )
    }

    const latestVideo = videos[0]

    if (videoID !== latestVideo.id) {
      // Send message
      const guild = await client.guilds.cache.get("849545086718443520")
      const messageChannel = await guild.channels.cache.get(
        "849545086718443523"
      )

      messageChannel.send(
        `Kay re bada! ${title} posted a new YouTube Video. Check it out\n${latestVideo.link}`
      )

      // Update latest video in Xata
      await xata.db.LatestYouTubeVideo.update(id, {
        videoID: latestVideo.id,
      })
    }
  })

  setTimeout(ytNotification(), 5 * 60 * 1000)
}