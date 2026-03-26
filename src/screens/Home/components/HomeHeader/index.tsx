import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { InputYearPicker } from "@/components";
import { colors } from "@/theme";
import { CategoryFormModal } from "../CategoryFomModal";
import { AccountFormModal } from "../AccountFormModal";
import { styles } from "./styles";

export type ActiveModal = "categoryForm" | "accountForm" | null;

export function HomeHeader() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

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

        <TouchableOpacity>
          <Ionicons
            name="person"
            color={colors.gray[100]}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.filter}>
        <InputYearPicker />
      </View>

      <CategoryFormModal
        activeModal={activeModal === "categoryForm"}
        setActiveModal={setActiveModal}
      />

      <AccountFormModal
        activeModal={activeModal === "accountForm"}
        setActiveModal={setActiveModal}
      />
    </LinearGradient>
  );
}
