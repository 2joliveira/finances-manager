import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/theme";
import { styles } from "./styles";
import { DetailsCard } from "./components/detailsCard";

export function TransactionsHeader() {
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
        <DetailsCard title="Receita" iconName="trending-up" value={5000} />
        <DetailsCard title="Despesas" iconName="trending-down" value={3000} />
        <DetailsCard title="Saldo" iconName="drag-handle" value={2000} />
      </View>
    </LinearGradient>
  );
}
