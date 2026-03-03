import { Text, TextInput, View } from "react-native";
import { Error } from "../Error";
import { styles } from "./styles";
import { colors } from "@/theme";

interface InputTextProps extends Omit<
  React.ComponentProps<typeof TextInput>,
  "onChange"
> {
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
  error?: string;
}

export function InputText({
  value,
  onChange,
  error,
  ...props
}: InputTextProps) {
  return (
    <View
      style={{
        ...styles.container,
        ...(error && {
          borderWidth: 1,
          borderColor: colors.red[500],
        }),
      }}
    >
      {value && <Text style={styles.placeholder}>{props.placeholder}</Text>}
      <TextInput
        style={{ ...styles.value, marginTop: value ? 10 : 0 }}
        onChangeText={onChange}
        {...props}
      />

      {error && <Error message={error} />}
    </View>
  );
}
