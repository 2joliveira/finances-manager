import { Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/theme";
import { styles } from "./styles";

export function HomeHeader() {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Ionicons
          name="wallet-outline"
          color={colors.gray[100]}
          size={24}
          style={styles.icon}
        />

        <View>
          <Text style={styles.title}>Minhas Finanças</Text>
          <Text style={styles.subtitle}>Saldo: R$ 5.000,00</Text>
        </View>
      </View>

      <View style={styles.filter}>
        <TextInput
          placeholder="Buscar mês"
          style={styles.textInput}
          placeholderTextColor={colors.blue[300]}
        />

        <View style={styles.yearSelect}>
          <Text style={styles.yearText}>2026</Text>
        </View>
      </View>
    </LinearGradient>
  );
}
