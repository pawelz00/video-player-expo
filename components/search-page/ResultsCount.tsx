import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, StyleSheet, View } from "react-native";

interface ResultsCountProps {
  count: number | null;
  search: string;
}

export default function ResultsCount({ count, search }: ResultsCountProps) {
  if (count === null) return null;

  return (
    <>
      <Text style={styles.count}>
        {`${count} results found for: `}
        <Text style={styles.bold}>{`"${search}"`}</Text>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  count: {
    color: Colors.secondary,
    letterSpacing: 0.1,
    fontSize: 10,
    fontWeight: "300",
  },
  bold: {
    fontWeight: "bold",
  },
});
