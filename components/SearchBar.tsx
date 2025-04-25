import { Colors } from "@/constants/Colors";
import { TextInput, View, StyleSheet } from "react-native";
import SearchIcon from "@/assets/icons/search-icon.svg";
import { useCallback } from "react";
import { debounce } from "lodash";

interface SearchBarProps {
  onSearch: (text: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      onSearch(text);
    }, 3000),
    []
  );

  return (
    <View style={styles.searchBarContainer}>
      <SearchIcon
        width={24}
        height={24}
        stroke={Colors.secondary}
        strokeWidth={2}
      />
      <TextInput
        style={styles.searchBarInput}
        placeholder="Search videos"
        placeholderTextColor={Colors.secondary}
        onChangeText={debouncedSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    borderRadius: 16,
    padding: 8,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.secondary,
    gap: 12,
    flex: 1,
  },
  searchBarInput: {
    fontSize: 16,
    color: "#000",
    width: "auto",
  },
});
