import { VideoItem } from "@/types/video-item";
import { useRouter } from "expo-router";
import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

interface VideoItemProps {
  item: VideoItem;
}

export default function VideoSingleItem({ item }: VideoItemProps) {
  const router = useRouter();
  const { title, thumbnails, channelTitle, publishedAt, description } =
    item.snippet;

  const { viewCount, likeCount } = item.statistics ?? {
    viewCount: null,
    likeCount: null,
  };

  const handlePress = () => {
    router.push({
      pathname: "/details",
      params: {
        title,
        thumbnail: thumbnails.medium.url,
        channelTitle,
        publishedAt,
        description,
        viewCount,
        likeCount,
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Image
          source={{ uri: thumbnails.medium.url }}
          style={styles.thumbnail}
        />
        <Text style={styles.channel}>{channelTitle}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>
          {new Date(publishedAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    gap: 12,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "normal",
  },
  channel: {
    fontWeight: "bold",
    fontSize: 12,
  },
  date: {
    fontSize: 10,
    textAlign: "right",
  },
});
