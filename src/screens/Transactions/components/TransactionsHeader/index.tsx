import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DetailsCard } from "./components/detailsCard";
import { useTransactions } from "@/hooks";
import { colors } from "@/theme";
import { styles } from "./styles";

export function TransactionsHeader({ period }: { period: string | string[] }) {
  const { months } = useTransactions();

  const currentMonth = months.find(month => month.month === period);

  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            color={colors.gray[100]}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Janeiro 2026</Text>
      </View>

      <View style={styles.detailsContainer}>
        <DetailsCard title="Receita" iconName="trending-up" value={currentMonth.total_income} />
        <DetailsCard title="Despesas" iconName="trending-down" value={currentMonth.total_expense} />
        <DetailsCard
          title="Saldo"
          iconName="drag-handle"
          value={currentMonth.total_income - currentMonth.total_expense}
        />
      </View>
    </LinearGradient>
  );
}
