import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export type SortOption = "most-popular" | "date-latest" | "date-oldest";

export const sortOptionsMap: Record<SortOption, string> = {
  "most-popular": "Most popular",
  "date-latest": "Upload date: latest",
  "date-oldest": "Upload date: oldest",
};

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: SortOption) => void;
  currentSort: SortOption;
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Upload date: latest", value: "date-latest" },
  { label: "Upload date: oldest", value: "date-oldest" },
  { label: "Most popular", value: "most-popular" },
];

export default function SortModal({
  visible,
  onClose,
  onSelect,
  currentSort,
}: SortModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sort records by:</Text>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.optionButton}
              onPress={() => {
                onSelect(option.value);
              }}
            >
              <View style={styles.radioContainer}>
                <View style={styles.radioOuter}>
                  {currentSort === option.value && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.optionText}>{option.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 24,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Semibold",
    marginBottom: 24,
  },
  optionButton: {
    paddingVertical: 12,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.secondary,
  },
  optionText: {
    fontSize: 14,
    fontFamily: "Regular",
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 72,
  },
  confirmText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Semibold",
    letterSpacing: 0.1,
  },
});
