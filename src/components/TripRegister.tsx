import React from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import Timer from './Timer';
import { TripFormProvider } from '../contexts/FormContext';
import { useFormContext } from '../contexts/FormContext';
import StepNavigation from './FormSteps/StepNavigation';
import { FORM_STEPS } from '../utils/constant';

export default function TripRegister() {
  return (
    <TripFormProvider>
      <TripRegisterContent />
    </TripFormProvider>
  );
}

function TripRegisterContent() {
  const { currentStep } = useFormContext();

  // Render the current step
  const renderStep = () => {
    const step = FORM_STEPS.find((s) => s.id === currentStep);
    return step ? React.createElement(step.component) : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Timer />
        <View style={styles.stepIndicator}>
          {[1, 2, 3, 4, 5].map((step) => (
            <View
              key={step}
              style={[
                styles.stepDot,
                currentStep === step ? styles.activeStep : {},
                currentStep > step ? styles.completedStep : {},
              ]}
            />
          ))}
        </View>
        {renderStep()}
        <StepNavigation />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  stepDot: {
    ...theme.components.stepIndicator.dot,
  },
  activeStep: {
    ...theme.components.stepIndicator.activeDot,
  },
  completedStep: {
    ...theme.components.stepIndicator.completedDot,
  },
});
