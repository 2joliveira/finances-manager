import { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { ActiveModal } from "@/context/types";
import { AccountFormModal, CategoryFormModal } from "@/components";
import { colors, fontFamily } from "@/theme";

interface ItemProps {
  id: number;
  name: string;
  type: "income" | "expense";
}

interface OptionsList {
  options: ItemProps[];
  typeList: "categoryForm" | "accountForm";
  removeOption: (id: number) => void;
}

export function OptionsList({ options, typeList, removeOption }: OptionsList) {
  const [isModalOpen, setIsModalOpen] = useState<ActiveModal>(null);

  const renderOption = useCallback(({ id, name, type }: ItemProps) => {
    return (
      <View
        key={id}
        style={[
          styles.optionContainer,
          {
            borderColor:
              type === "expense" ? colors.red[500] : colors.green[500],
          },
        ]}
      >
        <Text style={styles.optionName}>{name}</Text>

        {/*
          <TouchableOpacity>
            <MaterialIcons name="edit" size={18} color={colors.gray[600]} />
          </TouchableOpacity>
        */}

        <TouchableOpacity onPress={() => removeOption(id)}>
          <MaterialIcons
            name="delete-outline"
            size={18}
            color={colors.red[400]}
          />
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <View style={{ position: "relative", flex: 1 }}>
      {options?.length > 0 ? (
        <View style={{ gap: 5 }}>
          {options.map((option) => renderOption(option))}
        </View>
      ) : (
        <Text>Lista vazia</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsModalOpen(typeList)}
      >
        <LinearGradient
          colors={[colors.blue[500], colors.blue[800]]}
          style={styles.gradient}
        >
          <MaterialIcons name="add" size={30} color={colors.gray[100]} />
        </LinearGradient>
      </TouchableOpacity>

      <CategoryFormModal
        activeModal={isModalOpen === "categoryForm"}
        setActiveModal={setIsModalOpen}
      />

      <AccountFormModal
        activeModal={isModalOpen === "accountForm"}
        setActiveModal={setIsModalOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  optionContainer: {
    height: 50,
    padding: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
  },
  optionName: {
    flex: 1,
    fontFamily: fontFamily.medium,
    color: colors.gray[800],
  },
});
