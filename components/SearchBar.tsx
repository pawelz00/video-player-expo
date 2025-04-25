import { Colors } from "@/constants/Colors";
import { TextInput, View, StyleSheet } from "react-native";

export default function SearchBar() {
  // Create me clickable search bar with input
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchBarInput}
        placeholder="Search videos"
        placeholderTextColor={Colors.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    borderRadius: 16,
    padding: 8,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    borderWidth: 2,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});
