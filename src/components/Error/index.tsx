import { StyleSheet, Text, View } from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";

interface ErrorProps {
  message: string;
}

export function Error({ message }: ErrorProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="cancel" size={12} color={colors.red[500]} />

      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -16,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: colors.red[500],
  }
})