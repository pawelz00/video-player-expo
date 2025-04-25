import { Tabs } from "expo-router";
import { Platform, Text } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import HomeIcon from "../../assets/icons/home-icon.svg";
import SearchIcon from "../../assets/icons/search-icon.svg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.textWhite,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "regular",
          marginTop: 4,
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeIcon width={32} height={32} fill={color} />
          ),
          tabBarStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <SearchIcon width={32} height={32} stroke={color} strokeWidth={3} />
          ),
          tabBarStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
    </Tabs>
  );
}
