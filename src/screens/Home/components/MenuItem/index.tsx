import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { colors, fontFamily } from "@/theme";
import { MenuOption } from "../MenuDialog";

interface MenuItemProps extends Omit<MenuOption, "type"> {
  onPress: () => void;
}

export function MenuItem({ icon, label, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <MaterialIcons name={icon} size={18} color={colors.gray[600]} />
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    right: 0,
    backgroundColor: colors.gray[100],
    padding: 20,
    borderRadius: 8,
    width: "60%",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionText: {
    fontFamily: fontFamily.medium,
    color: colors.gray[600],
    fontSize: 14,
  },
});
