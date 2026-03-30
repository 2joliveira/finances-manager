import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps  } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";

export interface TagCardProps extends TouchableOpacityProps  {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  selected?: boolean;
}

export function TagCard({ icon, title, selected, ...props }: TagCardProps) {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...(selected && { backgroundColor: colors.white }) }}
      {...props}
    >
      <MaterialIcons name={icon} size={20} color={colors.gray[500]} />

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 5,
    borderRadius: 8,
  },
  title: {
    color: colors.gray[500],
    fontFamily: fontFamily.regular
  }
})