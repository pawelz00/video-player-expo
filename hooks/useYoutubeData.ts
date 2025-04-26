import { VideoItem } from "@/types/video-item";
import { useQueries } from "@tanstack/react-query";
import Constants from "expo-constants";

const YOUTUBE_API_KEY = Constants.expoConfig?.extra?.youtubeApiKey;
const MAX_RESULTS = 4;

const fetchYoutubeVideosForHomePage = async (query: string) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&q=${query}&type=video&key=${YOUTUBE_API_KEY}`
  );
  return response.json();
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

export const useYoutubeDataSearch = (query: string) => {};
