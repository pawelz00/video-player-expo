import SearchBar from "@/components/SearchBar";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sizes } from "@/constants/Sizes";
import { useCallback, useState } from "react";
import ResultsCount from "@/components/search-page/ResultsCount";
import VideoList from "@/components/search-page/VideoList";
import Constants from "expo-constants";

const YOUTUBE_API_KEY = Constants.expoConfig?.extra?.youtubeApiKey;

export default function SearchScreen() {
  const [results, setResults] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const fetchVideos = async (searchQuery: string, newSearch = true) => {
    if (loading) return;

    setLoading(true);

    const params = new URLSearchParams({
      key: YOUTUBE_API_KEY,
      q: searchQuery,
      part: "snippet",
      maxResults: "20",
      type: "video",
    });

    if (!newSearch && nextPageToken) {
      params.append("pageToken", nextPageToken);
    }

    try {
      const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      const videoIds = data.items.map((item: any) => item.id.videoId).join(",");

      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );
      const statsData = await statsResponse.json();

      const enrichedItems = data.items.map((item: any, index: number) => ({
        ...item,
        statistics: statsData.items[index]?.statistics,
      }));

      if (newSearch) {
        setResults(enrichedItems);
        setTotalResults(data.pageInfo?.totalResults || 0);
      } else {
        // @ts-ignore
        setResults((prev) => [...prev, ...enrichedItems]);
      }

      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("YouTube API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    fetchVideos(text, true);
  }, []);

  const loadMore = () => {
    if (nextPageToken) {
      fetchVideos(query, false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.barContainer}>
        <SearchBar onSearch={handleSearch} />
      </View>
      <ResultsCount count={totalResults} search={query} />
      <VideoList data={results} onEndReached={loadMore} loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.paddingVertical,
    flexDirection: "column",
    gap: 16,
  },
  barContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
});
