import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import VideoSingleItem from "./VideoSingleItem";
import { VideoItem } from "@/types/video-item";

interface VideoListProps {
  data: VideoItem[] | null;
  onEndReached: () => void;
  loading: boolean;
  error?: string;
}

export default function VideoList({
  data,
  onEndReached,
  loading,
  error,
}: VideoListProps) {
  if (!data || (data?.length ?? 0) === 0 || error) {
    return (
      <View style={styles.separator}>
        <Text>{error ? error : "No videos available"}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => JSON.stringify(item)}
      renderItem={({ item }) => <VideoSingleItem item={item} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <Text>Loading more...</Text> : null}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
});
