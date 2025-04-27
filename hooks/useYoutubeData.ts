import { VideoItem } from "@/types/video-item";
import { useQueries, useQuery } from "@tanstack/react-query";
import Constants from "expo-constants";

const YOUTUBE_API_KEY = Constants.expoConfig?.extra?.youtubeApiKey;
const MAX_RESULTS = 4;

const fetchStatistics = async (videoIds: string) => {
  const statsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
  );

  return await statsResponse.json();
};

const fetchYoutubeVideosForHomePage = async (query: string) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&q=${query}&type=video&key=${YOUTUBE_API_KEY}`
  );

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    return null;
  }

  const videoIds = data.items.map((item: any) => item.id.videoId).join(",");

  const statsData = await fetchStatistics(videoIds);

  if (!statsData.items || statsData.items.length === 0) {
    return data;
  }

  const enrichedItems = data.items.map((item: any, index: number) => ({
    ...item,
    statistics: statsData.items[index]?.statistics,
  }));

  data.items = enrichedItems;

  return data;
};

const fetchYoutubeVideosForSearch = async (searchQuery: string) => {
  if (!searchQuery) {
    return null;
  }

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchQuery}&type=video&key=${YOUTUBE_API_KEY}`
  );

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    return null;
  }

  const videoIds = data.items.map((item: any) => item.id.videoId).join(",");

  const statsData = await fetchStatistics(videoIds);

  if (!statsData.items || statsData.items.length === 0) {
    return data;
  }

  const enrichedItems = data.items.map((item: any, index: number) => ({
    ...item,
    statistics: statsData.items[index]?.statistics,
  }));

  data.items = enrichedItems;

  return data;
};

export const useYoutubeDataHome = () => {
  const categories = ["React Native", "React", "TypeScript", "JavaScript"];

  const queries = useQueries({
    queries: categories.map((category) => ({
      queryKey: ["youtube", category],
      queryFn: () => fetchYoutubeVideosForHomePage(category),
      staleTime: 1000 * 60 * 5,
    })),
  });

  return {
    data: queries.map((query, index) => ({
      category: categories[index],
      items: (query.data?.items || null) as VideoItem[] | null,
      isLoading: query.isLoading,
      isError: query.isError,
    })),
  };
};

export const useYoutubeDataSearch = (searchQuery: string) => {
  const query = useQuery({
    queryKey: ["youtube", searchQuery],
    queryFn: () => fetchYoutubeVideosForSearch(searchQuery),
  });

  return {
    data: query.data ? query.data.items : null,
    numberOfResults: query.data ? query.data.pageInfo?.totalResults || 0 : 0,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
