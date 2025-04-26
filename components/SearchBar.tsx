import { Colors } from "@/constants/Colors";
import { TextInput, View, StyleSheet } from "react-native";
import SearchIcon from "@/assets/icons/search-icon.svg";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useRouter } from "expo-router";

interface SearchBarProps {
  search?: string;
  onSearch?: (text: string) => void;
  pushToSearch?: boolean;
}

export default function SearchBar({
  search,
  onSearch,
  pushToSearch,
}: SearchBarProps) {
  const router = useRouter();
  const [searchText, setSearchText] = useState(search ?? "");

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      onSearch?.(text);
    }, 2000),
    [onSearch]
  );

  const debouncedPush = useCallback(
    debounce((text: string) => {
      router.push({
        pathname: "/search",
        params: {
          searchQuery: text,
        },
      });
    }, 2000),
    [router]
  );

  const handleTextChange = (text: string) => {
    if (pushToSearch) {
      setSearchText(text);
      debouncedPush(text);
    } else {
      setSearchText(text);
      debouncedSearch(text);
    }
  };

  useEffect(() => {
    if (search !== undefined) {
      handleTextChange(search);
    }
  }, [search]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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
        value={searchText}
        onChangeText={handleTextChange}
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
