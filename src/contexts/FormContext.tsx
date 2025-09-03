import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useForm, FormProvider as RHFFormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerTripSchema } from '../schema/registerTripSchema';
import { Alert } from 'react-native';

type TripFormType = z.infer<typeof registerTripSchema>;

interface FormContextProps {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  resetForm: () => void;
  submitForm: () => void;
  timeLeft: number;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const TripFormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const totalSteps = 5; // Total number of steps in the form

  const methods = useForm<TripFormType>({
    resolver: zodResolver(registerTripSchema),
    defaultValues: {
      vehicleNumber: '',
      entryDate: '',
      exitDate: '',
      rcDoc: '',
      pucDoc: '',
      insuranceDoc: '',
      driverName: '',
      driverEmail: '',
      driverPhone: '',
      declaration: false,
    },
    mode: 'onChange',
  });

  // Timer effect
  React.useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    methods.reset();
    setCurrentStep(1);
    setTimeLeft(15 * 60); // Reset timer to 15 minutes
  };

  const submitForm = () => {
    methods.handleSubmit((data) => {
      console.log('Form submitted:', data);
      Alert.alert('Success', 'Trip Registered Successfully!');
      resetForm();
    })();
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        totalSteps,
        nextStep,
        prevStep,
        goToStep,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === totalSteps,
        resetForm,
        submitForm,
        timeLeft,
      }}>
      <RHFFormProvider {...methods}>{children}</RHFFormProvider>
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a TripFormProvider');
  }
  return context;
};

export const useFormMethods = () => {
  return useForm<TripFormType>({
    resolver: zodResolver(registerTripSchema),
  });
};
