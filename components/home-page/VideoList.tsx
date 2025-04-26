import { VideoItem } from "@/types/video-item";
import { View, Text, FlatList, StyleSheet } from "react-native";
import VideoSingleItem from "./VideoSingleItem";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { Sizes } from "@/constants/Sizes";

interface VideoListProps {
  items: VideoItem[] | null;
  title: string;
}

export default function VideoList({ items, title }: VideoListProps) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Link
          href={{
            pathname: "/search",
            params: { searchQuery: title },
          }}
          style={styles.showMore}
        >
          Show more
        </Link>
      </View>
      {items ? (
        <FlatList
          data={items}
          keyExtractor={(item) => JSON.stringify(item)}
          renderItem={({ item }) => <VideoSingleItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        />
      ) : (
        <Text style={styles.errorText}>No videos available for {title}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 16,
    paddingLeft: Sizes.paddingVertical,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: Sizes.paddingVertical,
  },
  title: {
    fontSize: 18,
    fontFamily: "Semibold",
    lineHeight: 24,
    letterSpacing: 0.1,
    color: Colors.secondary,
  },
  showMore: {
    fontSize: 12,
    fontFamily: "Regular",
    lineHeight: 24,
    letterSpacing: 0.1,
    color: Colors.secondary,
    textDecorationLine: "underline",
  },
  errorText: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: "Regular",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 24,
  },
});
