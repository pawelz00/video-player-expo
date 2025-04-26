import SearchBar from "@/components/SearchBar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sizes } from "@/constants/Sizes";
import { useCallback, useState } from "react";
import ResultsCount from "@/components/search-page/ResultsCount";
import VideoList from "@/components/search-page/VideoList";
import { useYoutubeDataSearch } from "@/hooks/useYoutubeData";
import { useLocalSearchParams } from "expo-router";

export default function SearchScreen() {
  const { searchQuery } = useLocalSearchParams();

  const [query, setQuery] = useState((searchQuery as string) ?? "");

  const { data, isError, isLoading, numberOfResults } =
    useYoutubeDataSearch(query);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.barContainer}>
        <SearchBar onSearch={handleSearch} search={String(searchQuery)} />
      </View>
      <ResultsCount count={numberOfResults} search={query} />
      <VideoList
        data={data ?? []}
        onEndReached={() => {}}
        loading={isLoading}
        error={isError ? "Error loading videos" : undefined}
      />
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
