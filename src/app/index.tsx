import { StyleSheet, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { HomeHeader } from "../components/HomeHeader";
import { colors } from "../theme/colors";


export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

       <HomeHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
});
