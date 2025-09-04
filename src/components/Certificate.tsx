import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFormContext } from 'react-hook-form';
import InputField from './InputField';
import DateTimePickerField from './DateTimePickerField';
import DocumentUpload from './DocumentUpload';
import { theme } from '../theme/theme';

interface CertificateProps {
    imageFieldTitle: string;
    isRC: boolean;
    fieldPrefix?: string;
}

const Certificate = ({ imageFieldTitle, isRC, fieldPrefix = '' }: CertificateProps) => {
  const { control, formState: { errors } } = useFormContext();
  const currentDate = useMemo(() => new Date(), []);

  return (
    <View>
      <InputField
        label="Document Number"
        required
        name={`${fieldPrefix}documentNumber`}
        control={control}
        placeholder={isRC ? "Format: XX00XX0000" : "Enter Document Number"}
        forceUppercase={true}
        maxLength={10}
        error={errors[`${fieldPrefix}documentNumber`] ? 
          String(errors[`${fieldPrefix}documentNumber`]?.message || '') : undefined}
      />
      <DateTimePickerField
        label="Issue Date"
        required
        name={`${fieldPrefix}issueDate`}
        control={control}
        error={errors[`${fieldPrefix}issueDate`] ? 
          String(errors[`${fieldPrefix}issueDate`]?.message || '') : undefined}
        placeholder="mm/dd/yyyy"
        dateOnly={true}
        maxDate={currentDate}
      />
      <DateTimePickerField
        label="Expiry Date"
        required
        name={`${fieldPrefix}expiryDate`}
        control={control}
        error={errors[`${fieldPrefix}expiryDate`] ? 
          String(errors[`${fieldPrefix}expiryDate`]?.message || '') : undefined}
        placeholder="mm/dd/yyyy"
        dateOnly={true}
        minDate={currentDate} // Only allow future dates (from current date)
      />

      <DocumentUpload
        title={imageFieldTitle}
        field={`${fieldPrefix}${isRC ? 'rcDoc' : 'doc'}`}
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
