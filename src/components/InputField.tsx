import React from "react";
import { Text, TextInput, View, TextInputProps, StyleSheet } from "react-native";
import { theme } from "../theme/theme";
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
      <View style={styles.container}>
        <Text style={styles.label}>
          {label}{required ? <Text style={styles.required}> *</Text> : ""}
        </Text>
        <TextInput
          style={[
            styles.input,
            error ? styles.inputError : null
          ]}
          value={value}
          onChangeText={onChange}
          placeholderTextColor="#888"
          {...props}
        />
        {error && (
          <Text style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontWeight: "600",
    fontSize: theme.typography.fontSize.md,
    marginBottom: theme.spacing.sm,
    color: theme.colors.dark,
  },
  required: {
    color: theme.colors.danger,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.light,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.dark,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    height: 56, // Increased height for modern look
  },
  inputError: {
    borderColor: theme.colors.danger,
    backgroundColor: '#fff6f6',
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.fontSize.sm,
    marginTop: theme.spacing.xs,
  },
});

export default InputField;
