import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFormContext } from 'react-hook-form';
import InputField from './InputField';
import DateTimePickerField from './DateTimePickerField';
import DocumentUpload from './DocumentUpload';
import { theme } from '../theme/theme';

interface CertificateProps {
    title: string;
    imageFieldTitle: string;
    isRC: boolean;
}

const Certificate = ({ title, imageFieldTitle, isRC }: CertificateProps) => {
  const { control, formState: { errors } } = useFormContext();
  const currentDate = useMemo(() => new Date(), []);

  return (
    <View>
      <Text style={styles.titleText}>{title}</Text>
      <InputField
        label="Document Number"
        required
        name="documentNumber"
        control={control}
        placeholder={isRC ? "Format: XX00XX0000" : "Enter Document Number"}
        forceUppercase={true}
        maxLength={10}
        error={typeof errors.documentNumber?.message === 'string' ? errors.documentNumber.message : undefined}
      />
      <DateTimePickerField
        label="Issue Date"
        required
        name="issueDate"
        control={control}
        error={typeof errors.issueDate?.message === 'string' ? errors.issueDate.message : undefined}
        placeholder="mm/dd/yyyy"
        dateOnly={true}
        maxDate={currentDate}
      />
      <DateTimePickerField
        label="Expiry Date"
        required
        name="expiryDate"
        control={control}
        error={typeof errors.expiryDate?.message === 'string' ? errors.expiryDate.message : undefined}
        placeholder="mm/dd/yyyy"
        dateOnly={true}
        minDate={currentDate} // Only allow future dates (from current date)
      />

      <DocumentUpload
        title="RC Image "
        field="rcDoc"
        control={control}
        errors={errors}
        required
      />
    </View>
  );
};

export default Certificate;

const styles = StyleSheet.create({
  titleText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
});
