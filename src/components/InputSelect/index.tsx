import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme";
import { styles } from "./styles";

interface Option {
  id: number;
  name: string;
}

interface InputSelectProps {
  placeholder: string;
  selectedOption: Option | null;
  onChange: (value: number) => void;
  options: Option[];
}

export function InputSelect({
  placeholder,
  selectedOption,
  options,
  onChange,
}: InputSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelectOption(value: number) {
    onChange(value);
    setIsOpen(false);
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsOpen(!isOpen)}
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
      </TouchableOpacity>

      <View
        style={{ ...styles.modalContainer, display: isOpen ? "flex" : "none" }}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handleSelectOption(option.id)}
          >
            <Text
              style={
                selectedOption?.id === option.id && {
                  backgroundColor: colors.gray[100],
                  padding: 5,
                  borderRadius: 5,
                }
              }
            >
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
