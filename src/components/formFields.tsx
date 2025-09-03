import React from "react";
import InputField from "./InputField";
import type { Control, FieldErrors } from "react-hook-form";


interface DriverFormFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

export const getDriverFormFields = ({ control, errors }: DriverFormFieldsProps) => [
  <InputField
    key="driverName"
    label="Driver Name"
    required
    name="driverName"
    control={control}
    error={typeof errors.driverName?.message === "string" ? errors.driverName.message : undefined}
  />,
  <InputField
    key="driverEmail"
    label="Email"
    required
    name="driverEmail"
    control={control}
    keyboardType="email-address"
    error={typeof errors.driverEmail?.message === "string" ? errors.driverEmail.message : undefined}
  />,
  <InputField
    key="driverPhone"
    label="Phone"
    required
    name="driverPhone"
    control={control}
    keyboardType="phone-pad"
    error={typeof errors.driverPhone?.message === "string" ? errors.driverPhone.message : undefined}
  />
];
