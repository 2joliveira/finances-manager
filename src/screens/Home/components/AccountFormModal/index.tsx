import { TouchableOpacity, Text, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcons } from "@expo/vector-icons";
import { Account, accountSchema } from "@/models/account";
import { colors } from "@/theme";
import { ActiveModal } from "../HomeHeader";
import { styles } from "./styles";
import { useAccountDatabase } from "@/hooks/useAccountDatabase";

interface CategoryFormProps {
  activeModal: boolean;
  setActiveModal: (activeModal: ActiveModal) => void;
}

export function AccountFormModal({
  activeModal,
  setActiveModal,
}: CategoryFormProps) {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(accountSchema),
  });

  const { create } = useAccountDatabase();

  function onSubmit(data: Account) {
    create(data);
    setActiveModal(null);
    reset();
  }

  return (
    <Modal isVisible={activeModal} onSwipeComplete={() => setActiveModal(null)}>
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

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.input}
                placeholder="Ex: Cartão de crédito"
                placeholderTextColor={colors.gray[400]}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View style={styles.buton}>
            <Text style={styles.buttonText}>Criar Forma de Pagamento</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
