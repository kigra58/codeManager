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
      <View style={{ marginBottom: 18 }}>
        <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 6, color: "#222" }}>
          {label}{required ? " *" : ""}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: error ? "#e74c3c" : "#d1d5db",
            backgroundColor: error ? "#fff6f6" : "#f7f8fa",
            paddingVertical: 12,
            paddingHorizontal: 14,
            marginBottom: 4,
            borderRadius: 10,
            fontSize: 15,
            color: "#222",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 2,
            elevation: 1,
          }}
          value={value}
          onChangeText={onChange}
          placeholderTextColor="#888"
          {...props}
        />
        {error && (
          <Text style={{ color: "#e74c3c", fontSize: 13, marginTop: 2 }}>
            {error}
          </Text>
        )}
      </View>
    )}
  />
);

export default InputField;
