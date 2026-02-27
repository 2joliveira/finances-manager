import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons/";
import { colors } from "@/theme";
import { styles } from "./styles";

interface DetailItemProps {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  value: string;
}

export function DetailItem({ icon, title, value }: DetailItemProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={24} color={colors.gray[500]} />

      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}