import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";

interface HomeDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export function HomeDialog({ visible, setVisible }: HomeDialogProps) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection="right"
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.optionContainer}>
          <MaterialIcons name="local-offer" size={18} color={colors.gray[600]} />
          <Text style={styles.optionText}>Criar categoria</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    right: 0,
    backgroundColor: colors.gray[100],
    padding: 20,
    borderRadius: 8,
    width: "60%",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionText: {
    fontFamily: fontFamily.medium,
    color: colors.gray[600],
    fontSize: 14,
  },
});