import { View } from "react-native";


import InputField from "./InputField";

interface DriverDetailsFormProps {
  control: any;
  errors: any;
}

export default function DriverDetailsForm({ control, errors }: DriverDetailsFormProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      <InputField
        label="Driver Name"
        required
        name="driverName"
        control={control}
        error={errors.driverName?.message}
      />
      <InputField
        label="Email"
        required
        name="driverEmail"
        control={control}
        keyboardType="email-address"
        error={errors.driverEmail?.message}
      />
      <InputField
        label="Phone"
        required
        name="driverPhone"
        control={control}
        keyboardType="phone-pad"
        error={errors.driverPhone?.message}
      />
    </View>
  );
}
