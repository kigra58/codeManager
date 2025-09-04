import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import { useFormContext as useRHFContext } from 'react-hook-form';
import InputField from '../InputField';
import { FORM_STEPS } from '../../utils/constant';

export default function Step3DriverDetails() {
  const { control, formState: { errors } } = useRHFContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{FORM_STEPS[2].title}</Text> 
      <InputField
        label="Driver Name"
        required
        name="driverName"
        control={control}
        error={typeof errors.driverName?.message === 'string' ? errors.driverName.message : undefined}
      />
      <InputField
        label="Email"
        required
        name="driverEmail"
        control={control}
        keyboardType="email-address"
        error={typeof errors.driverEmail?.message === 'string' ? errors.driverEmail.message : undefined}
      />
      <InputField
        label="Phone"
        required
        name="driverPhone"
        control={control}
        keyboardType="phone-pad"
        error={typeof errors.driverPhone?.message === 'string' ? errors.driverPhone.message : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
});
