import "dotenv/config";

export default {
  expo: {
    name: "video-player-expo",
    slug: "video-player-expo",
    extra: {
      youtubeApiKey: process.env.YOUTUBE_API_KEY,
    },
  },
};
