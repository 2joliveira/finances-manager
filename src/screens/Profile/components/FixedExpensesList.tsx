import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";
import { TransactionDetails } from "@/models";
import { useTransactions } from "@/hooks";
import { TransactionFormModal } from "@/components";
import { formatCurrency } from "@/utils/formatCyrrency";
import { colors, fontFamily } from "@/theme";

export function FixedExpensesList() {
  const { fixedTransactions } = useTransactions();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const renderFixedExpensesCard = useCallback(
    ({
      id,
      description,
      amount,
      transaction_date,
      category_name,
      type,
    }: TransactionDetails) => {
      return (
        <View key={id} style={styles.container}>
          <MaterialIcons
            name="circle"
            size={10}
            color={type === "expense" ? colors.red[500] : colors.green[500]}
            style={{
              marginBottom: 12,
            }}
          />

          <View style={styles.infos}>
            <Text style={styles.title}>{description}</Text>

            <View style={styles.details}>
              <Text style={styles.detail}>{formatCurrency(amount)}</Text>

              <MaterialIcons name="circle" size={4} color={colors.gray[500]} />

              <Text style={styles.detail}>{format(transaction_date, "dd/MM/yyyy")}</Text>

              <MaterialIcons name="circle" size={4} color={colors.gray[500]} />

              <Text style={styles.detail}>{category_name}</Text>
            </View>
          </View>

          {/*
            <TouchableOpacity>
              <MaterialIcons name="edit" size={18} color={colors.gray[600]} />
            </TouchableOpacity>
      
            <TouchableOpacity>
              <MaterialIcons
                name="delete-outline"
                size={18}
                color={colors.red[400]}
              />
            </TouchableOpacity>
          */}
        </View>
      );
    },
    [],
  );

  return (
    <View style={styles.listContainer}>
      <ScrollView>
        <View style={{ gap: 10 }}>
          {fixedTransactions.map((transaction) =>
            renderFixedExpensesCard(transaction),
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsTransactionModalOpen(true)}
      >
        <LinearGradient
          colors={[colors.blue[500], colors.blue[800]]}
          style={styles.gradient}
        >
          <MaterialIcons name="add" size={30} color={colors.gray[100]} />
        </LinearGradient>
      </TouchableOpacity>

      <TransactionFormModal
        isFixed
        isOpen={isTransactionModalOpen}
        setIsOpen={setIsTransactionModalOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    position: "relative",
    flex: 1,
    gap: 20,
  },
  container: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  infos: {
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.gray[800],
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  detail: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: colors.gray[500],
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 10,
  },
  gradient: {
    flex: 1,
    padding: 10,
    borderRadius: 50,
  },
});
