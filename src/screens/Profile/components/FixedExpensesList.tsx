import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";

function FixedExpensesCard() {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="circle"
        size={10}
        color={colors.red[500]}
        style={{
          marginBottom: 12,
        }}
      />

      <View style={styles.infos}>
        <Text style={styles.title}>Titulo</Text>

        <View style={styles.details}>
          <Text style={styles.detail}>Teste</Text>

          <MaterialIcons name="circle" size={4} color={colors.gray[500]} />

          <Text style={styles.detail}>Teste</Text>

          <MaterialIcons name="circle" size={4} color={colors.gray[500]} />

          <Text style={styles.detail}>Teste</Text>
        </View>
      </View>

      {/*<TouchableOpacity>
        <MaterialIcons name="edit" size={18} color={colors.gray[600]} />
      </TouchableOpacity>
      */}
      <TouchableOpacity>
        <MaterialIcons
          name="delete-outline"
          size={18}
          color={colors.red[400]}
        />
      </TouchableOpacity>
    </View>
  );
}

export function FixedExpensesList() {
  return (
    <ScrollView>
      <View style={styles.listContainer}>
        <FixedExpensesCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 5,
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
});
