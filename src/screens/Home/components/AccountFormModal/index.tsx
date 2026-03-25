import { TouchableOpacity, Text, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcons } from "@expo/vector-icons";
import { useAccount } from "@/hooks";
import { Account, accountSchema } from "@/models";
import { colors } from "@/theme";
import { ActiveModal } from "../HomeHeader";
import { styles } from "./styles";
import { InputSwitch, InputText, Loading } from "@/components";
import { typeOptions } from "@/context/types";

interface AccountFormProps {
  activeModal: boolean;
  setActiveModal: (activeModal: ActiveModal) => void;
}

export function AccountFormModal({
  activeModal,
  setActiveModal,
}: AccountFormProps) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      type: "expense",
    }
  });

  const { createAccount, isCreatingAccount } = useAccount();

  function onSubmit(data: Account) {
    createAccount(data);
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

        <View style={{ display: "flex", gap: 20 }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <InputText
                placeholder="Pagamento"
                placeholderTextColor={colors.gray[400]}
                value={value}
                onChange={onChange}
                error={errors?.name?.message}
              />
            )}
          />

          <View>
            <Text style={styles.label}>Tipo da transação</Text>

            <Controller
              control={control}
              name="type"
              render={({ field: { value, onChange } }) => (
                <InputSwitch
                  options={typeOptions}
                  option={{
                    label: value === "income" ? "Receita" : "Despesa",
                    value,
                  }}
                  onChange={onChange}
                  optionSwitchWidth={345}
                />
              )}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View style={styles.button}>
            {isCreatingAccount
              ? <Loading color={colors.white} />
              : <Text style={styles.buttonText}>Criar Forma de Pagamento</Text>
            }
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
