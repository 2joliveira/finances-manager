import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { MenuItem } from "./menuItem";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme";
import { ActiveModal } from "..";

interface MenuDialogProps {
  activeModal: boolean;
  setActiveModal: (activeModal: ActiveModal) => void;
}

export interface MenuOption {
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  type: ActiveModal;
}

const MENU_OPTIONS: MenuOption[] = [
  {
    label: "Criar categoria",
    icon: "local-offer",
    type: "categoryForm",
  },
];

export function MenuDialog({ activeModal, setActiveModal }: MenuDialogProps) {
  return (
    <Modal
      isVisible={activeModal}
      onBackdropPress={() => setActiveModal(null)}
      swipeDirection="right"
    >
      <View style={styles.container}>
        {MENU_OPTIONS.map(({ icon, label, type }) => (
          <MenuItem key={icon} icon={icon} label={label} onPress={() => setActiveModal(type)} />
        ))}
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
});
