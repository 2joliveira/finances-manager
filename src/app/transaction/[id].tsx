import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons/";
import { colors, fontFamily } from "@/theme";
import { formatCurrency } from "@/utils/formatCyrrency";
import { DetailItem } from "@/components/DetailItem";

const mock = {
  type: "income",
  title: "Salário",
  date: "2026-01-01",
  value: 5000,
  description: "Salário",
  category: "Salário",
};

export default function Transaction() {
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

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 260,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    paddingTop: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerDetails: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  title: {
    fontFamily: fontFamily.bold,
    color: colors.gray[100],
    fontSize: 20,
  },
  icon: {
    padding: 8,
    borderRadius: 100,
  },
  value: {
    fontFamily: fontFamily.bold,
    color: colors.gray[100],
    fontSize: 24,
  },
  category: {
    fontFamily: fontFamily.regular,
    color: colors.gray[100],
    fontSize: 14,
  },
  detailsText: {
    padding: 20,
    fontFamily: fontFamily.medium,
    color: colors.gray[600],
    fontSize: 20,
  },
  detailsContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 20,
    marginHorizontal: 20,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: colors.gray[300],
  },
});
