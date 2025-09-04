import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import { useFormContext as useRHFContext } from 'react-hook-form';
import DocumentUpload from '../DocumentUpload';
import { FORM_STEPS } from '../../utils/constant';

export default function Step2Documents() {
  const { control, formState: { errors } } = useRHFContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{FORM_STEPS[1].title}</Text>
      <DocumentUpload
        title="Registration Certificate (RC)"
        field="rcDoc"
        control={control}
        errors={errors}
      />
      <DocumentUpload
        title="Pollution Under Control (PUC)"
        field="pucDoc"
        control={control}
        errors={errors}
      />
      <DocumentUpload
        title="Insurance Certificate"
        field="insuranceDoc"
        control={control}
        errors={errors}
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
