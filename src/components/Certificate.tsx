import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFormContext, useWatch } from 'react-hook-form';
import InputField from './InputField';
import FormDatePicker from './CustomDatePicker';
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
  
  // Watch the issue date to set the minimum date for expiry date
  const issueDate = useWatch({
    control,
    name: `${fieldPrefix}issueDate`,
    defaultValue: ''
  });

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
      <FormDatePicker
        label="Issue Date"
        rules={{ required: 'Issue date is required' }}
        name={`${fieldPrefix}issueDate`}
        control={control}
        placeholder="mm/dd/yyyy"
        mode="date"
        maximumDate={currentDate}
      />
      <FormDatePicker
        label="Expiry Date"
        rules={{ required: 'Expiry date is required' }}
        name={`${fieldPrefix}expiryDate`}
        control={control}
        placeholder="mm/dd/yyyy"
        mode="date"
        minimumDate={issueDate ? new Date(new Date(issueDate).getTime() + 86400000) : currentDate} // Set minimum to day after issue date or current date
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
