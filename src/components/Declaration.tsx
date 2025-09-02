
import React from "react";
import { View, Text } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

type DeclarationProps = {
  control: Control<any>;
  errors: FieldErrors<any>;
};


export default function Declaration({ control, errors }: DeclarationProps) {
  return (
    <Controller
      control={control}
      name="declaration"
      render={({ field: { onChange, value } }) => (
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <CheckBox
            value={!!value}
            onValueChange={onChange}
          />
          <Text style={{ marginLeft: 8 }}>
            I hereby declare that the information provided is true and correct.
          </Text>
          {errors.declaration?.message && typeof errors.declaration.message === "string" && (
            <Text style={{ color: "red", marginLeft: 8 }}>{errors.declaration.message}</Text>
          )}
        </View>
      )}
    />
  );
}
