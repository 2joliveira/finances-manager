import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useTransactions } from "@/hooks/useTransactions";
import { Loading, TransactionFormModal } from "@/components";
import { colors } from "@/theme";
import { HomeHeader } from "./components/HomeHeader";
import { MonthCard } from "./components/MonthCard";

export function Home() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const { months, isLoadingMonths } = useTransactions();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <StatusBar style="auto" />

      <HomeHeader />

      {isLoadingMonths ? (
        <Loading />
      ) : (
        <View style={styles.list}>
          <ScrollView>
            {months?.map((item) => (
              <MonthCard key={item.month} {...item} />
            ))}
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
        </View>
      )}

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
    height: "100%",
    backgroundColor: colors.gray[100],
  },
  list: {
    position: "relative",
    flex: 1,
    height: "100%",
    padding: 10,
    gap: 20,
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 20,
  },
  gradient: {
    flex: 1,
    padding: 10,
    borderRadius: 50,
  },
});
