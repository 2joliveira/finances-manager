import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcons } from "@expo/vector-icons";
import { useCategories } from "@/hooks/useCategory";
import { InputSwitch } from "@/components/InputSwitch";
import { InputSelect } from "@/components/InputSelect";
import { InputText } from "@/components/InputText";
import { InputDate } from "@/components/InputDate";
import { Transaction, transactionSchema } from "@/models/transaction";
import { colors } from "@/theme";
import { styles } from "./styles";
import { useAccount } from "@/hooks/useAccount";
import { useTransactions } from "@/hooks/useTransaction";

interface TransactionFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function TransactionFormModal({
  isOpen,
  setIsOpen,
}: TransactionFormModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      is_installment: 0,
      transaction_date: new Date(),
    },
  });

  const isInstallment = watch("is_installment");

  const { accounts} = useAccount();
  const { categories } = useCategories();

  const { createTransaction } = useTransactions();

  const typeOptions = [
    { label: "Receita", value: "income" },
    { label: "Despesa", value: "expense" },
  ];

  function onCloseModal() {
    reset();
    setIsOpen(false);
  }

  function onSubmit(data: Transaction) {
    createTransaction(data);
    reset();
    setIsOpen(false);
  }

  return (
    <Modal isVisible={isOpen}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nova Transação</Text>

          <MaterialIcons
            name="close"
            size={22}
            color={colors.gray[500]}
            style={styles.closeButton}
            onPress={() => onCloseModal()}
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
              error={errors?.description?.message}
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
              value={value ? String(value) : ""}
              onChange={onChange}
              keyboardType="decimal-pad"
              error={errors?.amount?.message}
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
                    { label: "Sim", value: 1 },
                    { label: "Não", value: 0 },
                  ]}
                  option={{
                    label: value === 1 ? "Sim" : "Não",
                    value,
                  }}
                  onChange={onChange}
                />
              )}
            />
          </View>

          {isInstallment === 1 && (
            <View style={{ flex: 1, marginTop: 26 }}>
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
          )}
        </View>

        <Controller
          control={control}
          name="category_id"
          render={({ field: { value, onChange } }) => (
            <InputSelect
              placeholder="Selecione uma categoria"
              selectedOption={categories.find(
                (option) => option.id === value,
              )}
              onChange={onChange}
              options={categories}
              error={errors?.category_id?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="account_id"
          render={({ field: { value, onChange } }) => (
            <InputSelect
              placeholder="Selecione uma conta"
              selectedOption={accounts.find(
                (option) => option.id === value,
              )}
              onChange={onChange}
              options={accounts}
              error={errors?.account_id?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="transaction_date"
          render={({ field: { value, onChange } }) => (
            <InputDate
              label="Selecione a data da transação"
              value={value}
              onChange={onChange}
              error={errors?.transaction_date?.message}
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
