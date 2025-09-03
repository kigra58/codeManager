import { View } from "react-native";
import InputField from "./InputField";
import { useForm } from "react-hook-form";


export default function DriverDetailsForm() {
  const { control, formState: { errors } } = useForm();
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
