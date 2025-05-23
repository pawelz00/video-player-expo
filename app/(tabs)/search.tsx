import SearchBar from "@/components/SearchBar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sizes } from "@/constants/Sizes";
import { useCallback, useState } from "react";
import ResultsCount from "@/components/search-page/ResultsCount";
import VideoList from "@/components/search-page/VideoList";
import { useYoutubeDataSearch } from "@/hooks/useYoutubeData";
import { useLocalSearchParams } from "expo-router";
import SortModal, {
  SortOption,
  sortOptionsMap,
} from "@/components/search-page/SortModal";

export default function SearchScreen() {
  const { searchQuery } = useLocalSearchParams();
  const [query, setQuery] = useState<string>(() => {
    if (typeof searchQuery === "string" && searchQuery.length > 0) {
      return searchQuery;
    }
    return "";
  });
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("most-popular");

  const { data, isError, isLoading, numberOfResults } =
    useYoutubeDataSearch(query);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.barContainer}>
        <SearchBar onSearch={handleSearch} search={searchQuery as string} />
      </View>
      <ResultsCount count={numberOfResults} search={query} />
      <TouchableOpacity onPress={() => setSortModalVisible(true)}>
        <Text style={styles.sortBy}>
          Sort by:
          <Text style={styles.sortByText}> {sortOptionsMap[sortBy]}</Text>
        </Text>
      </TouchableOpacity>
      <VideoList
        data={data ?? []}
        onEndReached={() => {}}
        loading={isLoading}
        error={isError ? "Error loading videos" : undefined}
      />
      <SortModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
        onSelect={setSortBy}
        currentSort={sortBy}
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

  sortBy: {
    textAlign: "right",
    fontSize: 12,
    fontFamily: "Regular",
  },
  sortByText: {
    fontFamily: "Semibold",
  },
});
