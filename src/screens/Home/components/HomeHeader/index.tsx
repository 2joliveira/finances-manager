import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { InputYearPicker } from "@/components";
import { colors } from "@/theme";
import { styles } from "./styles";

export function HomeHeader() {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Minhas Finanças</Text>
          <Text style={styles.subtitle}>Controle seus gastos</Text>
        </View>

        <TouchableOpacity onPress={() => router.navigate("/profile")}>
          <Ionicons
            name="person"
            color={colors.gray[100]}
            size={20}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.filter}>
        <InputYearPicker />
      </View>
    </LinearGradient>
  );
}
