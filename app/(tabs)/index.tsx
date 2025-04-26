import SearchBar from "@/components/SearchBar";
import { Sizes } from "@/constants/Sizes";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsIcon from "@/assets/icons/settings-icon.svg";
import VideoList from "@/components/home-page/VideoList";
import { useYoutubeDataHome } from "@/hooks/useYoutubeData";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const { data } = useYoutubeDataHome();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.barContainer}>
          <SearchBar pushToSearch />
          <TouchableOpacity>
            <SettingsIcon style={styles.cogIcon} />
          </TouchableOpacity>
        </View>
        {data.map(({ category, items, isLoading, isError }) =>
          isLoading ? (
            <ActivityIndicator
              style={styles.loadingIndicator}
              key={category}
              size="large"
              color={Colors.secondary}
            />
          ) : isError ? (
            <Text style={styles.errorText} key={category}>
              Error loading {category} videos
            </Text>
          ) : (
            <VideoList key={category} title={category} items={items} />
          )
        )}
      </ScrollView>
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
    marginBottom: 32,
  },
  cogIcon: {
    width: 32,
    height: 32,
  },
  errorText: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: "Regular",
    textAlign: "center",
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
