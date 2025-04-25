import SearchBar from "@/components/SearchBar";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <SearchBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
