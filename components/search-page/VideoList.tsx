import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import VideoItem from "./VideoItem";

interface Props {
  data: any[];
  onEndReached: () => void;
  loading: boolean;
}

const VideoList: React.FC<Props> = ({ data, onEndReached, loading }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id.videoId}
    renderItem={({ item }) => <VideoItem item={item} />}
    onEndReached={onEndReached}
    onEndReachedThreshold={0.5}
    ListFooterComponent={loading ? <Text>Loading more...</Text> : null}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
  />
);

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
});

export default VideoList;
