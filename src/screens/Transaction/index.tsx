import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons/";
import { formatCurrency } from "@/utils/formatCyrrency";
import { DetailItem } from "./components/DetailItem";
import { colors } from "@/theme";
import { styles } from "./styles";

const mock = {
  type: "income",
  title: "Salário",
  date: "2026-01-01",
  value: 5000,
  description: "Salário",
  category: "Salário",
};

export function Transaction() {
  const isIncome = mock.type === "income";

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
          >{`${isIncome ? "+" : "-"} ${formatCurrency(mock.value)}`}</Text>
          <Text style={styles.category}>{mock.category}</Text>
        </View>
      </View>

      <Text style={styles.detailsText}>Detalhes</Text>

      <View style={styles.detailsContainer}>
        <DetailItem
          icon="description"
          title="Descrição"
          value={mock.description}
        />
        <View style={styles.divider} />
        <DetailItem
          icon="attach-money"
          title="Valor"
          value={formatCurrency(mock.value)}
        />
        <View style={styles.divider} />
        <DetailItem
          icon="local-offer"
          title="Categoria"
          value={mock.category}
        />
        <View style={styles.divider} />
        <DetailItem
          icon="event"
          title="Data"
          value={mock.date}
        />
        <View style={styles.divider} />
        <DetailItem
          icon="trending-up"
          title="Tipo"
          value={mock.type}
        />
      </View>
    </View>
  );
}
