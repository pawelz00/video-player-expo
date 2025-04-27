import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Sizes } from "@/constants/Sizes";
import { useState } from "react";
import LikesIcon from "@/assets/icons/likes-icon.svg";
import ViewsIcon from "@/assets/icons/views-icon.svg";

export default function VideoDetailsScreen() {
  const { title, thumbnail, channelTitle, description, likeCount, viewCount } =
    useLocalSearchParams();

  const [activeTab, setActiveTab] = useState("Details");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.titleText}>{title}</Text>

          <View style={styles.channelContainer}>
            <View style={styles.channelAvatar}>
              <Text style={styles.avatarText}></Text>
            </View>
            <Text style={styles.channelName}>{channelTitle}</Text>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Details" && styles.activeTab]}
              onPress={() => setActiveTab("Details")}
            >
              <Text style={styles.tabText}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Notes" && styles.activeTab]}
              onPress={() => setActiveTab("Notes")}
            >
              <Text style={styles.tabText}>Notes</Text>
            </TouchableOpacity>
          </View>

          {activeTab === "Details" && (
            <View style={styles.detailsContainer}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                {description || "No description available"}
              </Text>

              <Text style={styles.sectionTitle}>Statistics</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                  <ViewsIcon width={16} height={16} stroke={"#fff"} />
                  <Text style={styles.statText}>{viewCount} views</Text>
                </View>
                <View style={styles.statBox}>
                  <LikesIcon width={16} height={16} stroke={"#fff"} />
                  <Text style={styles.statText}>{likeCount} likes</Text>
                </View>
              </View>
            </View>
          )}

          {activeTab === "Notes" && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesText}>No notes available</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: Sizes.padding,
    paddingVertical: Sizes.paddingVertical,
  },
  content: {
    paddingVertical: Sizes.paddingVertical,
    paddingHorizontal: Sizes.padding,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
    color: Colors.secondary,
    letterSpacing: 0.1,
  },
  channel: {
    fontSize: 14,
    color: Colors.primary,
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  channelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  channelAvatar: {
    width: 48,
    height: 48,
    borderRadius: 25,
    backgroundColor: "#2B2D42",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "white",
    fontSize: 24,
  },
  channelName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderBottomColor: "#C8C8C8",
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#333",
  },
  tabText: {
    fontSize: 12,
    color: Colors.secondary,
  },
  detailsContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "semibold",
    marginBottom: 5,
    color: Colors.secondary,
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: 12,
    color: Colors.secondary,
    marginBottom: 20,
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: "space-between",
    gap: 8,
  },
  statText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "semibold",
  },
  notesContainer: {
    padding: 20,
    alignItems: "center",
  },
  notesText: {
    color: "#777",
    fontSize: 16,
  },
});
