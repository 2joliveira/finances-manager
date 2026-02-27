import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { TransactionFormModal } from "./components/TransactionFormModal";
import { HomeHeader } from "./components/HomeHeader";
import { MonthCard } from "./components/MonthCard";
import { colors } from "@/theme";

export function Home() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <HomeHeader />

      <ScrollView>
        <View style={styles.list}>
          <MonthCard />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsTransactionModalOpen(true)}
      >
        <LinearGradient
          colors={[colors.blue[500], colors.blue[800]]}
          style={styles.gradient}
        >
          <MaterialIcons name="add" size={30} color={colors.gray[100]} />
        </LinearGradient>
      </TouchableOpacity>

      <TransactionFormModal
        isOpen={isTransactionModalOpen}
        setIsOpen={setIsTransactionModalOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  list: {
    padding: 20,
    gap: 20,
  },
  button: {
    position: "absolute",
    bottom: 60,
    right: 20,
  },
  gradient: {
    flex: 1,
    padding: 10,
    borderRadius: 50,
  }
});