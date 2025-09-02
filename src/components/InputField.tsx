import React from "react";
import { Text, TextInput, View, TextInputProps } from "react-native";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

interface InputFieldProps extends Omit<TextInputProps, "value" | "onChangeText"> {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, control, error, required, ...props }) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value } }) => (
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "bold" }}>
          {label}{required ? " *" : ""}
        </Text>
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 5 }}
          value={value}
          onChangeText={onChange}
          {...props}
        />
        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </View>
    )}
  />
);

export default InputField;
