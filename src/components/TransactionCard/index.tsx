import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme";
import { styles } from "./styles";
import { formatCurrency } from "@/utils/formatCyrrency";

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
    <View style={styles.container}>
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
    </View>
  );
}
