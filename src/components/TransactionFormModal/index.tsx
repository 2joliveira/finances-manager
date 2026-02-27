import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme";
import { styles } from "./styles";
import { InputSwitch } from "../InputSwitch";
import { useState } from "react";

interface TransactionFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function TransactionFormModal({
  isOpen,
  setIsOpen,
}: TransactionFormModalProps) {
  const [isInstallment, setIsInstallment] = useState("Não");
  const [transactionType, setTransactionType] = useState("Receita");

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

          <TextInput
            style={styles.input}
            placeholder="Ex: Almoço no restaurante"
            placeholderTextColor={colors.gray[400]}
          />
        </View>

        <View>
          <Text style={styles.label}>Valor</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: R$ 50,00"
            placeholderTextColor={colors.gray[400]}
          />
        </View>

        <View>
          <Text style={styles.label}>Tipo da transação</Text>

          <InputSwitch
            options={["Receita", "Despesa"]}
            value={transactionType}
            onChange={setTransactionType}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
          <View>
            <Text style={styles.label}>Compra parcelada</Text>

            <InputSwitch
              options={["Sim", "Não"]}
              value={isInstallment}
              onChange={setIsInstallment}
            />
          </View>

          <View>
            <Text style={styles.label}>Número de parcelas</Text>

            <TextInput
              style={styles.input}
              placeholder="Ex: 2"
              placeholderTextColor={colors.gray[400]}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Criar Transação</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
