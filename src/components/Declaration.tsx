
import React from "react";
import { View, Text, Switch } from "react-native";
import type { FormType } from "../utils/interfaces";

interface DeclarationProps {
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
}

export default function Declaration({ form, setForm }: DeclarationProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>Declaration</Text>
      <Switch
        value={form.declaration}
        onValueChange={(val: boolean) => setForm({ ...form, declaration: val })}
      />
      <Text style={{ fontSize: 12, marginTop: 5 }}>
        I hereby declare that all details are correct and genuine.
      </Text>
    </View>
  );
}
