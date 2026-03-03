import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcons } from "@expo/vector-icons";
import { Transaction, transactionSchema } from "@/models/transaction";
import { useCategoryDatabase } from "@/hooks/useCategoryDatabase";
import { useAccountDatabase } from "@/hooks/useAccountDatabase";
import { InputSwitch } from "@/components/InputSwitch";
import { InputSelect } from "@/components/InputSelect";
import { InputText } from "@/components/InputText";
import { CategoryModel } from "@/models/category";
import { AccountModel } from "@/models/account";
import { colors } from "@/theme";
import { styles } from "./styles";

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
      account_id: 0,
      transaction_date: new Date().toISOString(),
    },
  });
  const { listAll: listCategories } = useCategoryDatabase();
  const { listAll: listAccounts } = useAccountDatabase();

  const [categoryOptions, setCategoryOptions] = useState<CategoryModel[]>([]);
  const [accountOptions, setAccountOptions] = useState<AccountModel[]>([]);

  const typeOptions = [
    { label: "Receita", value: "income" },
    { label: "Despesa", value: "expense" },
  ];

  function onSubmit(data: Transaction) {
    console.log(data);
  }

  async function fetchCategories() {
    const options = await listCategories();

    setCategoryOptions(options);
  }

  async function fetchAccounts() {
    const options = await listAccounts();

    setAccountOptions(options);
  }

  useEffect(() => {
    fetchAccounts();
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

        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <InputText
              placeholder="Descrição"
              placeholderTextColor={colors.gray[400]}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="amount"
          render={({ field: { value, onChange } }) => (
            <InputText
              placeholder="Valor"
              placeholderTextColor={colors.gray[400]}
              value={value && String(value)}
              onChange={onChange}
              keyboardType="decimal-pad"
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
                  options={[
                    { label: "Sim", value: "true" },
                    { label: "Não", value: "false" },
                  ]}
                  option={{
                    label: String(value) === "true" ? "Sim" : "Não",
                    value: String(value),
                  }}
                  onChange={onChange}
                />
              )}
            />
          </View>

          <View style={{ flex: 1, marginTop: 30 }}>
            <Controller
              control={control}
              name="installments"
              render={({ field: { value, onChange } }) => (
                <InputText
                  placeholder="Número de parcelas"
                  placeholderTextColor={colors.gray[400]}
                  value={value && String(value)}
                  onChange={onChange}
                  keyboardType="numeric"
                />
              )}
            />
          </View>
        </View>

        <Controller
          control={control}
          name="category_id"
          render={({ field: { value, onChange } }) => (
            <InputSelect
              placeholder="Selecione uma categoria"
              selectedOption={categoryOptions.find(
                (option) => option.id === value,
              )}
              onChange={onChange}
              options={categoryOptions}
            />
          )}
        />

        <Controller
          control={control}
          name="account_id"
          render={({ field: { value, onChange } }) => (
            <InputSelect
              placeholder="Selecione uma conta"
              selectedOption={accountOptions.find(
                (option) => option.id === value,
              )}
              onChange={onChange}
              options={accountOptions}
            />
          )}
        />

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Criar Transação</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
