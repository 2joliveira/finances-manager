import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcons } from "@expo/vector-icons";
import { Transaction, transactionSchema } from "@/models/transaction";
import { useCategoryDatabase } from "@/hooks/useCategoryDatabase";
import { InputSwitch } from "@/components/InputSwitch";
import { InputSelect } from "@/components/InputSelect";
import { colors } from "@/theme";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { CategoryModel } from "@/models/category";

interface TransactionFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function TransactionFormModal({
  isOpen,
  setIsOpen,
}: TransactionFormModalProps) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      type: "expense",
      is_installment: false,
      installments: 2,
      account_id: 0,
      transaction_date: new Date().toISOString(),
    },
  });
  const { listAll } = useCategoryDatabase();

  const [categoryOptions, setCategoryOptions] = useState<CategoryModel[]>([]);

  function onSubmit(data: Transaction) {
    console.log(data);
  }

  async function fetchCategories() {
    const options = await listAll();

    setCategoryOptions(options);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Modal isVisible={isOpen}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nova Transação</Text>

          <MaterialIcons
            name="close"
            size={24}
            color={colors.gray[500]}
            style={styles.closeButton}
            onPress={() => setIsOpen(false)}
          />
        </View>

        <View>
          <Text style={styles.label}>Descrição</Text>

          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.input}
                placeholder="Ex: Almoço no restaurante"
                placeholderTextColor={colors.gray[400]}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.label}>Valor</Text>

          <Controller
            control={control}
            name="amount"
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.input}
                placeholder="Ex: R$ 50,00"
                placeholderTextColor={colors.gray[400]}
                value={value && String(value)}
                onChangeText={onChange}
                keyboardType="decimal-pad"
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.label}>Tipo da transação</Text>

          <Controller
            control={control}
            name="type"
            render={({ field: { value, onChange } }) => (
              <InputSwitch
                options={["Receita", "Despesa"]}
                value={value === "income" ? "Receita" : "Despesa"}
                onChange={onChange}
              />
            )}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <View>
            <Text style={styles.label}>Compra parcelada</Text>

            <Controller
              control={control}
              name="is_installment"
              render={({ field: { value, onChange } }) => (
                <InputSwitch
                  options={["Sim", "Não"]}
                  value={value === true ? "Sim" : "Não"}
                  onChange={onChange}
                />
              )}
            />
          </View>

          <View>
            <Text style={styles.label}>Número de parcelas</Text>

            <Controller
              control={control}
              name="installments"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 2"
                  placeholderTextColor={colors.gray[400]}
                  value={String(value)}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Categoria</Text>

          <Controller
            control={control}
            name="category_id"
            render={({ field: { value, onChange } }) => (
              <InputSelect
                placeholder="Selecione uma categoria"
                selectedOption={categoryOptions.find((option) => option.id === value)}
                onChange={onChange}
                options={categoryOptions}
              />
            )}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Criar Transação</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
