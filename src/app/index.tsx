import { ScrollView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/theme";
import { HomeHeader } from "../components/HomeHeader";
import { MonthCard } from "../components/Monthcard";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <HomeHeader />

      <ScrollView>
        <View style={styles.list}>
          <MonthCard />
        </View>
      </ScrollView>
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
});
