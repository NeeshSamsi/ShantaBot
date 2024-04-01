const { Client } = require("discord.js")
const { getXataClient } = require("../lib/xata")
const Parser = require("rss-parser")

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  fetchNewYTVideo(client)
}

async function fetchNewYTVideo(client) {
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

    if (videoID !== videos[0].id) {
      // Send message
      const guild = await client.guilds.cache.get("849545086718443520")
      const messageChannel = await guild.channels.cache.get(
        "849545086718443523"
      )

      console.log(videos[0])

      const newVideoID = videos[0].id.replace("yt:video:", "")
      const videoUrl = `https://www.youtube.com/watch?v=${newVideoID}`

      messageChannel.send(
        `Kay re bada! ${title} posted a new YouTube Video. Check it out\n${videoUrl}`
      )

      // Update latest video in Xata
      await xata.db.LatestYouTubeVideo.update(id, {
        videoID: videos[0].id,
      })
    }
  })

  setTimeout(fetchNewYTVideo, 300000)
}
