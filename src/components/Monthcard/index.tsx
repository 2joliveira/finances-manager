import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../theme/colors";

export function MonthCard() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Janeiro</Text>

        <Text style={styles.itemsCount}>4 itens</Text>
        <MaterialIcons
          name="chevron-right"
          size={22}
          color={colors.gray[600]}
          style={{ marginRight: -8 }}
        />
      </View>

      <View style={styles.monthTransactions}>
        <View style={styles.monthTransactionContainer}>
          <MaterialIcons
            name="trending-up"
            size={20}
            color={colors.green[500]}
          />
          <Text
            style={{ ...styles.monthTransactionText, color: colors.green[500] }}
          >
            R$ 5.000,00
          </Text>
        </View>

        <View style={styles.monthTransactionContainer}>
          <MaterialIcons
            name="trending-down"
            size={20}
            color={colors.red[500]}
          />
          <Text
            style={{ ...styles.monthTransactionText, color: colors.red[500] }}
          >
            R$ 3.000,00
          </Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text style={{ ...styles.totalText, color: colors.green[500] }}>
          Saldo: R$ 2.000,00
        </Text>
      </View>
    </TouchableOpacity>
  );
}
