import { View } from "react-native";
import InputField from "./InputField";
import { Control, FieldErrors } from "react-hook-form";

interface DriverDetailsFormProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

export default function DriverDetailsForm({ control, errors }: DriverDetailsFormProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      <InputField
        label="Driver Name"
        required
        name="driverName"
        control={control}
        error={typeof errors.driverName?.message === "string" ? errors.driverName.message : undefined}
      />
      <InputField
        label="Email"
        required
        name="driverEmail"
        control={control}
        keyboardType="email-address"
        error={typeof errors.driverEmail?.message === "string" ? errors.driverEmail.message : undefined}
      />
      <InputField
        label="Phone"
        required
        name="driverPhone"
        control={control}
        keyboardType="phone-pad"
        error={typeof errors.driverPhone?.message === "string" ? errors.driverPhone.message : undefined}
      />
    </View>
  );
}
