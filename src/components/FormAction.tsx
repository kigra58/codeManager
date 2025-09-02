import React from "react";
import { View, Button } from "react-native";

interface FormActionsProps {
  onClear: () => void;
  onSubmit: () => void;
}

export default function FormActions({ onClear, onSubmit }: FormActionsProps) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button title="Clear Form" color="gray" onPress={onClear} />
      <Button title="Register Trip" onPress={onSubmit} />
    </View>
  );
}
