import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, fontFamily } from "@/theme";
import { styles } from "./styles";
import { Error } from "../Error";
import { Loading } from "../Loading";

interface Option {
  id: number;
  name: string;
}

interface InputSelectProps {
  id: string;
  placeholder: string;
  selectedOption: Option | null;
  onChange: (value: number) => void;
  options: Option[];
  error?: string;
  isOpen: boolean;
  setOpenSelect: (id: string | null) => void;
  isLoading: boolean;
}

export function InputSelect({
  id,
  placeholder,
  selectedOption,
  options,
  onChange,
  error,
  isOpen,
  setOpenSelect,
  isLoading,
}: InputSelectProps) {

  function handleSelectOption(value: number) {
    onChange(value);
    setOpenSelect(null);
  }

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        style={{
          ...styles.container,
          ...(isOpen && {
            zIndex: 4,
          }),
          ...(error && {
            borderWidth: 1,
            borderColor: colors.red[500],
          }),
        }}
        onPress={() => setOpenSelect(isOpen ? null : id)}
      >
        <Text
          style={selectedOption ? styles.placeholderOff : styles.placeholderOn}
        >
          {placeholder}
        </Text>
        <Text style={styles.value}>{selectedOption?.name}</Text>

        <MaterialIcons
          name="arrow-drop-down"
          size={28}
          color={colors.gray[400]}
          style={{
            transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
          }}
        />

        {error && <Error message={error} />}
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.modalContainer}>
          {isLoading
            ? <Loading />
            : options.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleSelectOption(option.id)}
                style={{
                  flex: 1,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    ...{ padding: 5 },
                    ...(selectedOption?.id === option.id && {
                      fontFamily: fontFamily.bold,
                    }),
                  }}
                >
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
}
