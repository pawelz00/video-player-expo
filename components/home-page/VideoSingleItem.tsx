import { Colors } from "@/constants/Colors";
import { VideoItem } from "@/types/video-item";
import { View, Image, Text, StyleSheet } from "react-native";

interface VideoItemProps {
  item: VideoItem;
}

export default function VideoSingleItem({ item }: VideoItemProps) {
  const { title, thumbnails, publishedAt } = item.snippet;

  return (
    <View style={styles.viewContainer}>
      <Image style={styles.thumbnail} source={{ uri: thumbnails.medium.url }} />
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.date}>
        {new Date(publishedAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: "column",
    gap: 4,
    marginBottom: 20,
    width: 180,
  },
  thumbnail: {
    width: 180,
    height: 112,
    borderRadius: 16,
  },
  title: {
    fontSize: 12,
    fontFamily: "Medium",
    color: Colors.secondary,
  },
  date: {
    fontSize: 10,
    fontFamily: "Regular",
    color: Colors.secondary,
    textAlign: "right",
  },
});
