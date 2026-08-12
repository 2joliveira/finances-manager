import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, fontFamily } from "@/theme";

export function ProfileHeader() {
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

        <Text style={styles.title}>Meu Perfil</Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    marginTop: 70,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontFamily: fontFamily.bold,
    color: colors.gray[100],
    fontSize: 20,
  },
  icon: {
    padding: 8,
    backgroundColor: colors.blue[500],
    borderRadius: 100,
  }
})