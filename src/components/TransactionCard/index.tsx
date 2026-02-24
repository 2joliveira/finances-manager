import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { formatCurrency } from "@/utils/formatCyrrency";
import { colors } from "@/theme";
import { styles } from "./styles";

interface TransactionCard {
  iconName: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  subtitle: string;
  value: number;
  type: "income" | "expense";
}

export function TransactionCard({
  iconName,
  title,
  subtitle,
  value,
  type,
}: TransactionCard) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.navigate('/transaction/id')}>
      <MaterialIcons
        name={iconName}
        size={20}
        color={type === "income" ? colors.green[500] : colors.red[500]}
        style={{
          ...styles.icon,
          backgroundColor:
            type === "income" ? colors.green[100] : colors.red[100],
        }}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <Text
        style={{
          ...styles.value,
          color: type === "income" ? colors.green[500] : colors.red[500],
        }}
      >
        {formatCurrency(value)}
      </Text>
    </TouchableOpacity>
  );
}
