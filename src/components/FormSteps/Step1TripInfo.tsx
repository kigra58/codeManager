import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import { useFormContext as useRHFContext } from 'react-hook-form';
import InputField from '../InputField';
import DateTimePickerField from '../DateTimePickerField';
import { FORM_STEPS } from '../../utils/constant';

export default function Step1TripInfo() {
  const { control, formState: { errors }, watch } = useRHFContext();
  
  // Get the current date to use as minimum date
  const currentDate = useMemo(() => new Date(), []);
  
  // Get the entry date to use as minimum date for exit date
  const entryDateValue = watch('entryDate');
  const entryDate = useMemo(() => {
    // If entry date is selected, use it as minimum for exit date
    // Otherwise use current date as minimum
    if (entryDateValue) {
      const date = new Date(entryDateValue);
      // Add 1 minute to ensure exit date is always greater than entry date
      date.setMinutes(date.getMinutes() + 1);
      return date;
    }
    return currentDate;
  }, [entryDateValue, currentDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{FORM_STEPS[0].title}</Text>
      {/* <Text style={styles.title}>Step 1: Trip Information</Text> */}
      <InputField
        label="Vehicle Number"
        required
        name="vehicleNumber"
        control={control}
        placeholder="Format: XX00XX0000"
        forceUppercase={true}
        error={typeof errors.vehicleNumber?.message === 'string' ? errors.vehicleNumber.message : undefined}
      />
      <DateTimePickerField
        label="Entry Date & Time"
        required
        name="entryDate"
        control={control}
        placeholder="YYYY-MM-DD HH:mm"
        error={typeof errors.entryDate?.message === 'string' ? errors.entryDate.message : undefined}
        minDate={currentDate}
      />
      <DateTimePickerField
        label="Exit Date & Time"
        name="exitDate"
        control={control}
        placeholder="YYYY-MM-DD HH:mm"
        error={typeof errors.exitDate?.message === 'string' ? errors.exitDate.message : undefined}
        minDate={entryDate}
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
