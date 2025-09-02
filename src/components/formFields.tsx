import React from "react";
import InputField from "./InputField";

export const getDriverFormFields = ({ control, errors }: any) => [
  <InputField
    key="driverName"
    label="Driver Name"
    required
    name="driverName"
    control={control}
    error={errors.driverName?.message}
  />,
  <InputField
    key="driverEmail"
    label="Email"
    required
    name="driverEmail"
    control={control}
    keyboardType="email-address"
    error={errors.driverEmail?.message}
  />,
  <InputField
    key="driverPhone"
    label="Phone"
    required
    name="driverPhone"
    control={control}
    keyboardType="phone-pad"
    error={errors.driverPhone?.message}
  />
];
