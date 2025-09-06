import React, { useMemo, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import { useFormContext as useRHFContext } from 'react-hook-form';
import { FORM_STEPS } from '../../utils/constant';
import DocumentUpload from '../DocumentUpload';
import InputField from '../InputField';
import FormDatePicker from '../CustomDatePicker';

export default function Step3DriverDetails() {
  const { control, formState: { errors }, setValue } = useRHFContext();
  
  // Ensure date fields are empty on component mount
  useEffect(() => {
    // Clear date fields if they have default values
    setValue('driverDob', '');
    setValue('dlIssueDate', '');
    setValue('dlExpiryDate', '');
  }, [setValue]);

  // Calculate date 18 years ago for DOB max date
  const maxDobDate = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date;
  }, []);

  // Current date for DL Issue Date max and DL Expiry Date min
  const currentDate = useMemo(() => new Date(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{FORM_STEPS[2].title}</Text> 
      <InputField
        label="Driver Name"
        required
        name="driverName"
        placeholder='Enter driver name'
        control={control}
        error={typeof errors.driverName?.message === 'string' ? errors.driverName.message : undefined}
      />
      <FormDatePicker
        label="Date of Birth"
        rules={{ required: 'Date of birth is required' }}
        name="driverDob"
        control={control}
        placeholder="mm/dd/yyyy"
        mode="date"
        maximumDate={maxDobDate}
      />
      <InputField
        label="Email Address"
        required
        name="driverEmail"
        placeholder='Enter email address'
        control={control}
        keyboardType="email-address"
        error={typeof errors.driverEmail?.message === 'string' ? errors.driverEmail.message : undefined}
      />
      <InputField
        label="Phone Number"
        required
        name="driverPhone"
        placeholder='Enter phone number'
        control={control}
        keyboardType="phone-pad"
        error={typeof errors.driverPhone?.message === 'string' ? errors.driverPhone.message : undefined}
      />
      <InputField
        label="Driver's License Number"
        required
        name="driverLicenseNumber"
        control={control}
        placeholder="Format: DL-00000000000"
        maxLength={14} // DL- + 11 digits
        forceUppercase={true}
        error={typeof errors.driverLicenseNumber?.message === 'string' ? errors.driverLicenseNumber.message : undefined}
      />
      <FormDatePicker
        label="DL Issue Date"
        rules={{ required: 'DL issue date is required' }}
        name="dlIssueDate"
        control={control}
        placeholder="mm/dd/yyyy"
        mode="date"
        maximumDate={currentDate} // Only allow past dates (up to current date)
      />
      <FormDatePicker
        label="DL Expiry Date"
        rules={{ required: 'DL expiry date is required' }}
        name="dlExpiryDate"
        control={control}
        placeholder="mm/dd/yyyy"
        mode="date"
        minimumDate={currentDate} // Only allow future dates (from current date)
      />
      <View style={styles.imageUploadContainer}>
        <DocumentUpload
          title="DL Image (Optional - JPG or PNG, max 5MB)"
          field="dlImage"
          control={control}
          errors={errors}
          required={false}
        />
      </View>
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
  label: {
    fontWeight: '600',
    fontSize: theme.typography.fontSize.md,
    marginBottom: theme.spacing.sm,
    color: theme.colors.dark,
  },
  infoText: {
    fontWeight: 'normal',
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray,
  },
  imageUploadContainer: {
    marginTop: theme.spacing.sm,
  },
});
