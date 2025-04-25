import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.textWhite,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "regular",
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
          // tabBarIcon: ({ color }) => (
          //   <IconSymbol size={28} name="house.fill" color={color} />
          // ),
          tabBarStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          // tabBarIcon: ({ color }) => (
          //   <IconSymbol size={28} name="paperplane.fill" color={color} />
          // ),
          tabBarStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
    </Tabs>
  );
}
