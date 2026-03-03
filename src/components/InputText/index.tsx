import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

interface InputTextProps extends Omit<
  React.ComponentProps<typeof TextInput>,
  "onChange"
> {
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
}

export function InputText({ value, onChange, ...props }: InputTextProps) {
  return (
    <View style={styles.container}>
      {value && <Text style={styles.placeholder}>{props.placeholder}</Text>}
      <TextInput
        style={{ ...styles.value, marginTop: value ? 10 : 0 }}
        onChangeText={onChange}
        {...props}
      />
    </View>
  );
}
