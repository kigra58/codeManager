import React from "react";
import { View, Text, TextInput } from "react-native";


import type { FormType } from "../utils/interfaces";

interface TripInfoFormProps {
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
}

export default function TripInfoForm({ form, setForm }: TripInfoFormProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>Trip Information</Text>

      <Text>Vehicle Number *</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter vehicle number"
        value={form.vehicleNumber}
        onChangeText={(val) => setForm({ ...form, vehicleNumber: val })}
      />

      <Text>Entry Date & Time *</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="YYYY-MM-DD HH:mm"
        value={form.entryDate}
        onChangeText={(val) => setForm({ ...form, entryDate: val })}
      />

      <Text>Exit Date & Time</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10 }}
        placeholder="YYYY-MM-DD HH:mm"
        value={form.exitDate}
        onChangeText={(val) => setForm({ ...form, exitDate: val })}
      />
    </View>
  );
}
