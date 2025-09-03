import React from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import Timer from './Timer';
import { TripFormProvider } from '../contexts/FormContext';
import { useFormContext } from '../contexts/FormContext';
import Step1TripInfo from './FormSteps/Step1TripInfo';
import Step2Documents from './FormSteps/Step2Documents';
import Step3DriverDetails from './FormSteps/Step3DriverDetails';
import Step4Declaration from './FormSteps/Step4Declaration';
import Step5Review from './FormSteps/Step5Review';
import StepNavigation from './FormSteps/StepNavigation';

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
    switch (currentStep) {
      case 1:
        return <Step1TripInfo />;
      case 2:
        return <Step2Documents />;
      case 3:
        return <Step3DriverDetails />;
      case 4:
        return <Step4Declaration />;
      case 5:
        return <Step5Review />;
      default:
        return <Step1TripInfo />;
    }
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
