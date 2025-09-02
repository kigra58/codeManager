import { View, Text } from "react-native";

// ...existing code...

// ...existing code...
import InputField from "./InputField";

interface DocumentUploadProps {
  title: string;
  field: string;
  control: any;
  errors: any;
}

export default function DocumentUpload({ title, field, control, errors }: DocumentUploadProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      <InputField
        label={title}
        required
        name={field}
        control={control}
        error={errors[field]?.message}
      />
    </View>
  );
}
