
import React from "react";
import { View, Text, TextInput } from "react-native";
import type { FormType } from "../utils/interfaces";

interface DriverDetailsFormProps {
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
}

export default function DriverDetailsForm({ form, setForm }: DriverDetailsFormProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>Driver Details</Text>

      <Text>Driver Name *</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={form.driverName}
  onChangeText={(val: string) => setForm({ ...form, driverName: val })}
      />

      <Text>Email *</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="email-address"
        value={form.driverEmail}
  onChangeText={(val: string) => setForm({ ...form, driverEmail: val })}
      />

      <Text>Phone *</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="phone-pad"
        value={form.driverPhone}
  onChangeText={(val: string) => setForm({ ...form, driverPhone: val })}
      />
    </View>
  );
}
