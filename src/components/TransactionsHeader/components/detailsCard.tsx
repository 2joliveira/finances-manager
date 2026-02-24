import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";
import { formatCurrency } from "@/utils/formatCyrrency";

interface DetailsCardProps {
  title: string;
  iconName: React.ComponentProps<typeof MaterialIcons>["name"];
  value: number;
}

export function DetailsCard({ title, iconName, value }: DetailsCardProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name={iconName} size={18} color={colors.blue[200]} />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.value}>{formatCurrency(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "32%",
    backgroundColor: colors.blue[500],
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.blue[200],
  },
  value: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.blue[100],
  },
});
