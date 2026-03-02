import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme";
import { styles } from "./styles";
import { InputSwitch } from "../../../../components/InputSwitch";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transaction, transactionSchema } from "@/models/transaction";

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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      amount: 0,
      type: "expense",
      is_installment: false,
      installments: 2,
      category_id: 0,
      account_id: 0,
      transaction_date: new Date().toISOString(),
    },
  });

  function onSubmit(data: Transaction) {
    console.log(data);
  }

  console.log({ errors });

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
                value={String(value)}
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
                value={value}
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
                  value={true ? "Sim" : "Não"}
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

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Criar Transação</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
