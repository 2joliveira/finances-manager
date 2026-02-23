import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { colors } from "../theme/colors";


export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 200,
    backgroundColor: colors.blue[200],
  },
  headerContent: {
    display: 'flex',
    gap: 4,
  },
});
