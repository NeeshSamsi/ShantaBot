const { Client } = require("discord.js")
const { getXataClient } = require("../lib/xata")
const Parser = require("rss-parser")
const cron = require("node-cron")

/**
 *
 * @param {Client} client
 */
module.exports = async function youtubeNotifications(client) {
  setTimeout(async () => {
    await ytNoti(client)
  }, 500)

  cron.schedule("*/5 * * * *", ytNoti)
}

/**
 *
 * @param {Client} client
 */
async function ytNoti(client) {
  console.log(
    new Date().toLocaleString() + " Checking latest YouTube Videos..."
  )

  try {
    const xata = getXataClient()
    const parser = new Parser()

    const channels = await xata.db.LatestYouTubeVideo.getAll()

    channels.forEach(async (channel) => {
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
        console.log(`Found new video from ${title}`)

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
      } else {
        console.log(`No new videos from ${title}`)
      }
    })
  } catch (error) {
    console.error(error)
  }
}
