import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useForm, FormProvider as RHFFormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerTripSchema } from '../schema/registerTripSchema';
import { Alert } from 'react-native';
import { saveFormData, getFormData, saveCurrentStep, getCurrentStep, clearFormStorage, updateFormData } from '../utils/storageUtils';

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
  isLoading: boolean;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const TripFormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isLoading, setIsLoading] = useState(true);
  const totalSteps = 5; // Total number of steps in the form

  const methods = useForm<TripFormType>({
    resolver: zodResolver(registerTripSchema),
    defaultValues: {
      documentNumber: '',
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
  
  // Load saved form data and current step from AsyncStorage on mount
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        setIsLoading(true);
        // Get saved form data
        const savedData = await getFormData();
        if (savedData) {
          // Reset form with saved values
          methods.reset(savedData);
        }
        
        // Get saved step
        const savedStep = await getCurrentStep();
        if (savedStep) {
          setCurrentStep(savedStep);
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSavedState();
  }, []);

  // Timer effect
  React.useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  
  // Save form data whenever it changes
  useEffect(() => {
    const subscription = methods.watch((data) => {
      updateFormData(data as Partial<TripFormType>);
    });
    
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      saveCurrentStep(newStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      saveCurrentStep(newStep);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      saveCurrentStep(step);
    }
  };

  const resetForm = () => {
    methods.reset();
    setCurrentStep(1);
    setTimeLeft(15 * 60); // Reset timer to 15 minutes
    clearFormStorage(); // Clear stored form data
  };

  const submitForm = () => {
    methods.handleSubmit((data) => {
      console.log('Form submitted:', data);
      // Clear form data from storage after successful submission
      clearFormStorage();
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
        isLoading,
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
