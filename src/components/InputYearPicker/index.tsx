import { useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";
import { Context } from "@/context/context";
import { useTransactions } from "@/hooks";

export function InputYearPicker() {
  const { dispatch, selectedYear } = useContext(Context);
  const { isLoadingMonths } = useTransactions();

  function handleSelectYear(year: number) {
    dispatch({ type: "SET_SELECTED_YEAR", payload: year })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectYear(selectedYear - 1)}
        disabled={isLoadingMonths}
      >
        <Ionicons
          name="chevron-back"
          color={colors.gray[100]}
          size={22}
        />
      </TouchableOpacity>

      <Text style={styles.text}>{selectedYear}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectYear(selectedYear + 1)}
        disabled={isLoadingMonths}
      >
        <Ionicons
          name="chevron-forward"
          color={colors.gray[100]}
          size={22}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 45,
    width: "100%",
    padding: 8,
    borderRadius: 10,
  },
  text: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.gray[100],
  },
  button: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});
