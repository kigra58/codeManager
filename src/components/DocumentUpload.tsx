
import React from "react";
import { View, Text, Button } from "react-native";
import DocumentPicker, { types as DocumentPickerTypes } from "react-native-document-picker";
import type { FormType } from "../utils/interfaces";

interface DocumentUploadProps {
  title: string;
  field: keyof FormType;
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
}

export default function DocumentUpload({ title, field, form, setForm }: DocumentUploadProps) {
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pick({ type: [DocumentPickerTypes.images] });
      if (result && result[0]?.uri) {
        setForm({ ...form, [field]: result[0].uri });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.error(err);
      }
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: "bold" }}>{title} *</Text>
      <Button title="Upload File" onPress={pickFile} />
  {typeof form[field] === "string" && form[field] && <Text>📂 {form[field]}</Text>}
    </View>
  );
}
