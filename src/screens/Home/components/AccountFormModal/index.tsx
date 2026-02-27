import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme";
import { styles } from "./styles";
import { ActiveModal } from "../HomeHeader";

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

