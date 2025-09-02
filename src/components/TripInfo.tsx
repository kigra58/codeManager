


import React from "react";
import { View, Text } from "react-native";

import type { Control, FieldErrors } from "react-hook-form";
import InputField from "./InputField";

type TripInfoFormProps = {
  control: Control<any>;
  errors: FieldErrors<any>;
};

export default function TripInfoForm({ control, errors }: TripInfoFormProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>Trip Information</Text>
      <InputField
        label="Vehicle Number"
        required
        name="vehicleNumber"
        control={control}
        placeholder="Enter vehicle number"
        error={typeof errors.vehicleNumber?.message === "string" ? errors.vehicleNumber.message : undefined}
      />
      <InputField
        label="Entry Date & Time"
        required
        name="entryDate"
        control={control}
        placeholder="YYYY-MM-DD HH:mm"
        error={typeof errors.entryDate?.message === "string" ? errors.entryDate.message : undefined}
      />
      <InputField
        label="Exit Date & Time"
        name="exitDate"
        control={control}
        placeholder="YYYY-MM-DD HH:mm"
        error={typeof errors.exitDate?.message === "string" ? errors.exitDate.message : undefined}
      />
    </View>
  );
}
