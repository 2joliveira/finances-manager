import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";
import { styles } from "./styles";
import { MenuDialog } from "./components/menuDialog";
import { CategoryFormModal } from "./components/categoryFomModal";
import { AccountFormModal } from "./components/accountFormModal";

export type ActiveModal = "menu" | "categoryForm" | "accountForm" | null;

export function HomeHeader() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

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

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Minhas Finanças</Text>
          <Text style={styles.subtitle}>Saldo: R$ 5.000,00</Text>
        </View>

        <TouchableOpacity
          onPress={() => setActiveModal("menu")}
          style={{ padding: 10, marginRight: -15 }}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color={colors.gray[100]}
            style={{}}
          />
        </TouchableOpacity>
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

      <MenuDialog
        activeModal={activeModal === "menu"}
        setActiveModal={setActiveModal}
      />

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
