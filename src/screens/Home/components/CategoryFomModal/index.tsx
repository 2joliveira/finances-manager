import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcons } from "@expo/vector-icons";
import { Category, categorySchema } from "@/models";
import { typeOptions } from "@/context/types";
import { useCategories } from "@/hooks";
import { colors, fontFamily } from "@/theme";
import { InputSwitch, InputText } from "@/components";
import { ActiveModal } from "../HomeHeader";

interface CategoryFormProps {
  activeModal: boolean;
  setActiveModal: (activeModal: ActiveModal) => void;
}

export function CategoryFormModal({
  activeModal,
  setActiveModal,
}: CategoryFormProps) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      type: "expense",
    }
  });

  const { createCategory } = useCategories();

  function onSubmit(data: Category) {
    createCategory(data);
    setActiveModal(null);
    reset();
  }

  return (
    <Modal
      isVisible={activeModal}
      onSwipeComplete={() => setActiveModal(null)}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nova Categoria</Text>

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
                placeholder="Nome da Categoria"
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
            <Text style={styles.buttonText}>Criar Categoria</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "45%",
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
  button: {
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
