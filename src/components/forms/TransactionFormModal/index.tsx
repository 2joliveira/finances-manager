import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcons } from "@expo/vector-icons";
import { typeOptions } from "@/context/types";
import { Transaction, transactionSchema } from "@/models";
import {
  useAccount,
  useCategories,
  useMeasure,
  useTransactions,
} from "@/hooks";
import { colors } from "@/theme";
import { InputSwitch } from "@/components/InputSwitch";
import { InputText } from "@/components/InputText";
import { InputSelect } from "@/components/InputSelect";
import { InputDate } from "@/components/InputDate";
import { Loading } from "@/components/Loading";
import { styles } from "./styles";

interface TransactionFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isFixed?: boolean;
}

export function TransactionFormModal({
  isOpen,
  setIsOpen,
  isFixed,
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
      is_fixed: isFixed ? 1 : 0,
      transaction_date: new Date(),
    },
  });

  const [openSelect, setOpenSelect] = useState<string | null>(null);

  const isInstallment = watch("is_installment");
  const isExpense = watch("type") === "expense";

  const { accounts, isLoadingAccounts } = useAccount();
  const { categories, isLoadingCategories } = useCategories();

  const typeSwitchMeasure = useMeasure();
  const isInstallmentSwitchMeasure = useMeasure();

  const { createTransaction, isCreatingTransaction } = useTransactions();

  function onCloseModal() {
    reset();
    setIsOpen(false);
  }

  function onSubmit(data: Transaction) {
    createTransaction(data);

    if (!isCreatingTransaction) {
      reset();
      setIsOpen(false);
    }
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

        <View style={styles.content}>
          <View
            onLayout={typeSwitchMeasure.onLayout}
            style={{
              height: "100%",
              gap: 20,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.label}>Tipo da transação</Text>

              <Controller
                control={control}
                name="type"
                render={({ field: { value, onChange } }) =>
                  typeSwitchMeasure.width > 0 && (
                    <InputSwitch
                      options={typeOptions}
                      option={{
                        label: value === "income" ? "Receita" : "Despesa",
                        value,
                      }}
                      onChange={onChange}
                      optionSwitchWidth={typeSwitchMeasure.width}
                    />
                  )
                }
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

            {isExpense && (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: isInstallment
                    ? "space-between"
                    : "flex-start",
                  gap: 10,
                }}
              >
                <View onLayout={isInstallmentSwitchMeasure.onLayout}>
                  <Text style={styles.label}>Compra parcelada</Text>

                  <Controller
                    control={control}
                    name="is_installment"
                    render={({ field: { value, onChange } }) =>
                      isInstallmentSwitchMeasure.width > 0 && (
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
                          optionSwitchWidth={isInstallmentSwitchMeasure.width}
                        />
                      )
                    }
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
            )}

            <Controller
              control={control}
              name="amount"
              render={({ field: { value, onChange } }) => (
                <InputText
                  placeholder={
                    isInstallment === 1 ? "Valor da parcela" : "Valor"
                  }
                  placeholderTextColor={colors.gray[400]}
                  value={value ? String(value) : ""}
                  onChange={onChange}
                  keyboardType="decimal-pad"
                  error={errors?.amount?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="payment_method"
              render={({ field: { value, onChange } }) => (
                <InputText
                  placeholder="Método de pagamento"
                  placeholderTextColor={colors.gray[400]}
                  value={value}
                  onChange={onChange}
                  error={errors?.payment_method?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="category_id"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  id="category"
                  placeholder="Selecione uma categoria"
                  selectedOption={categories?.find(
                    (option) => option.id === value,
                  )}
                  onChange={onChange}
                  options={categories}
                  error={errors?.category_id?.message}
                  isOpen={openSelect === "category"}
                  setOpenSelect={setOpenSelect}
                  isLoading={isLoadingCategories}
                />
              )}
            />

            <Controller
              control={control}
              name="account_id"
              render={({ field: { value, onChange } }) => (
                <InputSelect
                  id="account"
                  placeholder="Selecione uma conta"
                  selectedOption={accounts?.find(
                    (option) => option.id === value,
                  )}
                  onChange={onChange}
                  options={accounts}
                  error={errors?.account_id?.message}
                  isOpen={openSelect === "account"}
                  setOpenSelect={setOpenSelect}
                  isLoading={isLoadingAccounts}
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
          </View>
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View style={styles.button}>
            {isCreatingTransaction ? (
              <Loading color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Criar Transação</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
