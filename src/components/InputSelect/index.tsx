import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme";
import { styles } from "./styles";
import { Error } from "../Error";

interface Option {
  id: number;
  name: string;
}

interface InputSelectProps {
  placeholder: string;
  selectedOption: Option | null;
  onChange: (value: number) => void;
  options: Option[];
  error?: string;
}

export function InputSelect({
  placeholder,
  selectedOption,
  options,
  onChange,
  error,
}: InputSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelectOption(value: number) {
    onChange(value);
    setIsOpen(false);
  }

  return (
    <View>
      {isOpen && (
        <TouchableWithoutFeedback
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={{
              ...styles.modalContainer,
            }}
          >
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleSelectOption(option.id)}
              >
                <Text
                  style={{
                    ...{ padding: 5 },
                    ...(selectedOption?.id === option.id && {
                      backgroundColor: colors.blue[50],
                    }),
                  }}
                >
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableWithoutFeedback>
      )}

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
        onPress={() => setIsOpen(!isOpen)}
        onPressOut={() => setIsOpen(true)}
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
    </View>
  );
}
