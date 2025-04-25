import SearchBar from "@/components/SearchBar";
import { Sizes } from "@/constants/Sizes";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsIcon from "@/assets/icons/settings-icon.svg";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.barContainer}>
        {/* <SearchBar /> */}
        <TouchableOpacity>
          <SettingsIcon style={styles.cogIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.paddingVertical,
  },
  barContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  cogIcon: {
    width: 32,
    height: 32,
  },
});
