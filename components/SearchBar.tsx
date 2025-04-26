import { Colors } from "@/constants/Colors";
import { TextInput, View, StyleSheet } from "react-native";
import SearchIcon from "@/assets/icons/search-icon.svg";
import { useCallback } from "react";
import { debounce } from "lodash";
import { useRouter } from "expo-router";

interface SearchBarProps {
  onSearch?: (text: string) => void;
  pushToSearch?: boolean;
}

export default function SearchBar({ onSearch, pushToSearch }: SearchBarProps) {
  const router = useRouter();
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (onSearch) {
        onSearch(text);
      }
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
        onChangeText={(text) => {
          if (pushToSearch) {
            router.push("/search");
          } else {
            debouncedSearch(text);
          }
          debouncedSearch(text);
        }}
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
    fontFamily: "Regular",
  },
});
