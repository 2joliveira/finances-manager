import { Pressable, Text, View, Animated } from "react-native";
import { useRef, useState } from "react";
import { styles } from "./styles";

interface InputSwitchProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function InputSwitch({ options, value, onChange }: InputSwitchProps) {
  const translateX = useRef(new Animated.Value(options[0] === value ? 0 : 80)).current;

  function handleChange(next: string) {
    onChange(next);

    Animated.timing(translateX, {
      toValue: next === options[1] ? 80 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />

      <Pressable style={styles.option} onPress={() => handleChange(options[0])}>
        <Text style={[styles.text, value === options[0] && styles.textActive]}>
          {options[0]}
        </Text>
      </Pressable>

      <Pressable style={styles.option} onPress={() => handleChange(options[1])}>
        <Text style={[styles.text, value === options[1] && styles.textActive]}>
          {options[1]}
        </Text>
      </Pressable>
    </View>
  );
}
