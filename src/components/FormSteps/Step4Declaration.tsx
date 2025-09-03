import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import { useFormContext as useRHFContext } from 'react-hook-form';
import CheckBox from '@react-native-community/checkbox';
import { Controller } from 'react-hook-form';

export default function Step4Declaration() {
  const { control, formState: { errors } } = useRHFContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 4: Declaration</Text>
      <Controller
        control={control}
        name="declaration"
        render={({ field: { onChange, value } }) => (
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={!!value}
              onValueChange={onChange}
            />
            <Text style={styles.declarationText}>
              I hereby declare that the information provided is true and correct.
            </Text>
            {errors.declaration?.message && typeof errors.declaration.message === 'string' && (
              <Text style={styles.errorText}>{errors.declaration.message}</Text>
            )}
          </View>
        )}
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  declarationText: {
    marginLeft: theme.spacing.sm,
    color: theme.colors.text,
    flex: 1,
  },
  errorText: {
    color: theme.colors.danger,
    marginLeft: theme.spacing.sm,
  },
});
