import { View } from "react-native";
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
    <View style={{ marginBottom: 20 }}>
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
