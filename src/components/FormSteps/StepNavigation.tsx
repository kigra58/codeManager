import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { theme } from '../../theme/theme';
import { useFormContext } from '../../contexts/FormContext';
import { useFormContext as useRHFContext } from 'react-hook-form';

interface StepNavigationProps {
  onSubmit?: () => void;
}

export default function StepNavigation({ onSubmit }: StepNavigationProps) {
  const { currentStep, nextStep, prevStep, isFirstStep, isLastStep, resetForm, submitForm, totalSteps } = useFormContext();
  const { trigger } = useRHFContext();

  const handleNext = async () => {
    // Validate the current step fields before proceeding
    let fieldsToValidate: string[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['vehicleNumber', 'entryDate'];
        break;
      case 2:
        fieldsToValidate = ['rcDoc', 'pucDoc', 'insuranceDoc'];
        break;
      case 3:
        fieldsToValidate = ['driverName', 'driverEmail', 'driverPhone'];
        break;
      case 4:
        fieldsToValidate = ['declaration'];
        break;
      default:
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      nextStep();
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      submitForm();
    }
  };

  const handlePrevious = () => {
    prevStep();
  };

  const handleClear = () => {
    resetForm();
  };

  return (
    <View style={styles.container}>
      {currentStep > 0 && (
        <TouchableOpacity
          style={[styles.button, styles.previousButton]}
          onPress={handlePrevious}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
      )}
      {currentStep < totalSteps - 1 && (
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.button, styles.clearButton]}
        onPress={handleClear}
      >
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
      {currentStep === totalSteps - 1 && (
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
  },
  button: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.spacing.xs,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.white,
  },
  previousButton: {
    backgroundColor: theme.colors.secondary,
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
  },
  clearButton: {
    backgroundColor: theme.colors.danger,
  },
  submitButton: {
    backgroundColor: theme.colors.success,
  },
});
