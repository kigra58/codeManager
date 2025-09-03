import { View, StyleSheet } from "react-native";
import { theme } from "../theme/theme";
import InputField from "./InputField";
import { Control, FieldErrors } from "react-hook-form";

interface DocumentUploadProps {
  title: string;
  field: string;
  control: Control<any>;
  errors: FieldErrors<any>;
}

export default function DocumentUpload({ title, field, control, errors }: DocumentUploadProps) {
  return (
    <View style={styles.container}>
      <InputField
        label={title}
        required
        name={field}
        control={control}
        error={typeof errors[field]?.message === "string" ? errors[field]?.message : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
});
