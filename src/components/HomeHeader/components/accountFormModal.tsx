import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { ActiveModal } from "..";
import { colors, fontFamily } from "@/theme";

interface CategoryFormProps {
  activeModal: boolean;
  setActiveModal: (activeModal: ActiveModal) => void;
}

export function AccountFormModal({
  activeModal,
  setActiveModal,
}: CategoryFormProps) {
  return (
    <Modal
      isVisible={activeModal}
      onSwipeComplete={() => setActiveModal(null)}
      swipeDirection="right"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nova Conta</Text>

          <MaterialIcons
            name="close"
            size={24}
            color={colors.gray[500]}
            style={styles.closeButton}
            onPress={() => setActiveModal(null)}
          />
        </View>

        <View>
          <Text style={styles.label}>Forma de pagamento</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: Cartão de crédito"
            placeholderTextColor={colors.gray[400]}
          />
        </View>

        <TouchableOpacity>
          <View style={styles.buton}>
            <Text style={styles.buttonText}>Criar Forma de Pagamento</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "40%",
    padding: 20,
    bottom: -20,
    right: -20,
    left: -20,
    justifyContent: "space-between",
    gap: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
  },
  closeButton: {
    padding: 8,
    backgroundColor: colors.gray[200],
    borderRadius: 50,
  },
  label: {
    padding: 5,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.gray[500],
  },
  input: {
    padding: 10,
    height: 50,
    backgroundColor: colors.gray[200],
    borderRadius: 10,
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.gray[800],
  },
  buton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: colors.blue[500],
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.gray[100],
  },
});
