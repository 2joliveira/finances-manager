import React, { useState } from "react";
import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";
import { Error } from "../Error";

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date) => void;
  label: string;
  error?: string;
}

export function InputDate({ value, onChange, label, error }: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (_: any, selectedDate?: Date) => {
    setIsOpen(false);
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={() => setIsOpen(true)}>
      <View
        style={{
          ...styles.container,
          ...(error && {
            borderWidth: 1,
            borderColor: colors.red[500],
          }),
        }}
      >
        <Text style={value ? styles.placeholderOff : styles.placeholderOn}>
          {label}
        </Text>
        {value && (
          <Text style={styles.value}>{value?.toLocaleDateString("pt-BR")}</Text>
        )}

        <MaterialIcons name="event" size={20} color={colors.gray[400]} />

        {isOpen && (
          <DateTimePicker
            value={value}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleChange}
          />
        )}

        {error && <Error message={error} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 10,
    height: 50,
    backgroundColor: colors.gray[200],
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholderOn: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.gray[400],
  },
  placeholderOff: {
    position: "absolute",
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.gray[400],
    top: 2,
    left: 10,
  },
  value: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.gray[800],
    marginTop: 10,
  },
});
