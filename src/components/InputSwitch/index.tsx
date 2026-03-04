import { Pressable, Text, View, Animated } from "react-native";
import { useRef } from "react";
import { styles } from "./styles";

interface Option {
  label: string;
  value: string | number;
}

interface InputSwitchProps {
  options: Option[];
  option: Option;
  onChange: (value: string | number) => void;
}

export function InputSwitch({ options, option, onChange }: InputSwitchProps) {
  const translateX = useRef(new Animated.Value(options[0].value === option.value ? 0 : 80)).current;

  function handleChange(next: string | number) {
    onChange(next);

    Animated.timing(translateX, {
      toValue: next === options[1].value ? 80 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />

      <Pressable style={styles.option} onPress={() => handleChange(options[0].value)}>
        <Text style={[styles.text, option.value === options[0].value && styles.textActive]}>
          {options[0].label}
        </Text>
      </Pressable>

      <Pressable style={styles.option} onPress={() => handleChange(options[1].value)}>
        <Text style={[styles.text, option.value === options[1].value && styles.textActive]}>
          {options[1].label}
        </Text>
      </Pressable>
    </View>
  );
}
