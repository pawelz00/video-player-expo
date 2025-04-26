export type VideoItem = {
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
    description: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
  };
};
