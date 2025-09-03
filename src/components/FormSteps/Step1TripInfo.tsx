import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import { useFormContext as useRHFContext } from 'react-hook-form';
import InputField from '../InputField';

export default function Step1TripInfo() {
  const { control, formState: { errors } } = useRHFContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 1: Trip Information</Text>
      <InputField
        label="Vehicle Number"
        required
        name="vehicleNumber"
        control={control}
        placeholder="Enter vehicle number"
        error={typeof errors.vehicleNumber?.message === 'string' ? errors.vehicleNumber.message : undefined}
      />
      <InputField
        label="Entry Date & Time"
        required
        name="entryDate"
        control={control}
        placeholder="YYYY-MM-DD HH:mm"
        error={typeof errors.entryDate?.message === 'string' ? errors.entryDate.message : undefined}
      />
      <InputField
        label="Exit Date & Time"
        name="exitDate"
        control={control}
        placeholder="YYYY-MM-DD HH:mm"
        error={typeof errors.exitDate?.message === 'string' ? errors.exitDate.message : undefined}
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
