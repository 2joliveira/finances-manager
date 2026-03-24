import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons/";
import { formatCurrency } from "@/utils/formatCyrrency";
import { DetailItem } from "./components/DetailItem";
import { colors } from "@/theme";
import { styles } from "./styles";
import { useTransactions } from "@/hooks";
import { useEffect } from "react";
import { Loading } from "@/components";

export function Transaction() {
  const { id } = useLocalSearchParams();

  const { showTransaction, transaction } = useTransactions();

  const isIncome = transaction?.type === "income";
  const isInstallment = transaction?.is_installment === 1;

  useEffect(() => {
    showTransaction(id.toString());

    return () => {
      showTransaction(null);
    };
  }, []);

  if (!transaction) return <Loading />

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: isIncome ? colors.green[400] : colors.red[400],
        }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              color={colors.gray[100]}
              size={24}
              style={{
                ...styles.icon,
                backgroundColor: isIncome ? colors.green[200] : colors.red[200],
              }}
            />
          </TouchableOpacity>

          <Text style={styles.title}>{isIncome ? "Receita" : "Despesa"}</Text>
        </View>

        <View style={styles.headerDetails}>
          <MaterialIcons
            name={isIncome ? "trending-up" : "trending-down"}
            size={40}
            color={colors.gray[100]}
            style={{
              ...styles.icon,
              backgroundColor: isIncome ? colors.green[200] : colors.red[200],
            }}
          />

          <Text
            style={styles.value}
          >{`${isIncome ? "+" : "-"} ${formatCurrency(transaction?.amount)}`}</Text>
          <Text style={styles.category}>{transaction?.category_name}</Text>
        </View>
      </View>

      <Text style={styles.detailsText}>Detalhes</Text>

      <View style={styles.detailsContainer}>
        <ScrollView>
          <DetailItem
            icon="description"
            title="Descrição"
            value={transaction?.description}
          />
          <View style={styles.divider} />
          <DetailItem
            icon="attach-money"
            title="Valor"
            value={formatCurrency(transaction?.amount)}
          />
          <View style={styles.divider} />
          {isInstallment && (
            <>
              <DetailItem
                icon="local-offer"
                title="Valor total"
                value={formatCurrency(transaction?.amount * transaction.installments)}
              />
              <View style={styles.divider} />
            </>
          )}
          <DetailItem
            icon="event"
            title="Data"
            value={isInstallment ? transaction.due_date?.toString() : transaction?.transaction_date?.toString()}
          />
          {isInstallment && (
            <>
              <View style={styles.divider} />
              <DetailItem
                icon="add-card"
                title="Parcelas"
                value={`${transaction?.installment_number} de ${transaction?.installments}`} />
            </>
          )}
          <View style={styles.divider} />
          <DetailItem
            icon="account-balance"
            title="Conta"
            value={transaction?.account_name} />
        </ScrollView>
      </View>
    </View >
  );
}
