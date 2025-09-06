import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { theme } from '../../theme/theme';
import { useFormContext } from '../../contexts/FormContext';
import { useFormContext as useRHFContext } from 'react-hook-form';
import { registerTripService, documentUploadService } from '../../services/tripServices';
import { IPayload, IDocumentUpload } from '../../utils/interfaces';

interface StepNavigationProps {
  onSubmit?: () => void;
}

export default function StepNavigation({ onSubmit }: StepNavigationProps) {
  const { currentStep, nextStep, prevStep, isFirstStep, isLastStep, resetForm, submitForm, totalSteps, isLoading } = useFormContext();
  const { trigger, getValues } = useRHFContext();
  const [submitting, setSubmitting] = useState(false);
  
  /**
   * Handles document upload for a specific document type
   * @param docValue The document value from form data
   * @param docType The type of document (RC, PUCC, INSURANCE)
   * @param docNumber Optional document number
   * @returns Object containing mediaId and documentType if successful, null otherwise
   */
  const handleDocumentUpload = async (
    file: File, 
    docType: "RC" | "PUCC" | "INSURANCE" | "DL", 
  ) => {
    if (!file) return null;
    try {
      const response = await documentUploadService({document_type: docType, file});
      console.log(`${docType} document upload response:`, response);
      if(response?.MediaID){
        return response?.MediaID
      }
    } catch (error) {
      console.error(`Error uploading ${docType} document:`, error);
    }
    return null;
  };

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

  const handleSubmit = async () => {
    if (onSubmit) {
      onSubmit();
      return;
    }
    
    try {
      setSubmitting(true);
      const formData = getValues();
      console.log('Form data to be submitted:', formData);
      
      // Array to store document information including MediaIDs
      const documentMediaIds: { documentType: "RC" | "PUCC" | "INSURANCE" | "DL"; mediaId: string; number: string }[] = [];
      
      // Upload documents in parallel using Promise.all
      const uploadPromises = [
        formData.rcDoc ? handleDocumentUpload(formData.rcDoc, "RC") : null,
        formData.pucDoc ? handleDocumentUpload(formData.pucDoc, "PUCC") : null,
        formData.insuranceDoc ? handleDocumentUpload(formData.insuranceDoc, "INSURANCE") : null
      ];
      
      const uploadResults = await Promise.all(uploadPromises);
      
      // Collect valid MediaIDs
      const mediaIds = uploadResults.filter(result => result !== null);
      console.log('Uploaded document MediaIDs:', mediaIds);
      
      // Prepare documents array for trip registration using the MediaIDs
      const documentTypes = ["RC", "PUCC", "INSURANCE"];
      const documents = [];
      
      // Match MediaIDs with document types
      for (let i = 0; i < uploadResults.length; i++) {
        const mediaId = uploadResults[i];
        if (mediaId) {
          documents.push({
            documentType: documentTypes[i] as "RC" | "PUCC" | "INSURANCE",
            number: i === 0 ? formData.documentNumber || '' : '',
            mediaId: mediaId,
            issueDate: '',
            expiryDate: ''
          });
        }
      }
      

      
      console.log('Documents for trip registration:', documents);
      
      // Prepare payload for trip registration with document MediaIDs
      const tripPayload: IPayload = {
        vehicle: {
          number: formData.vehicleNumber
        },
        trip: {
          EntryDateTime: formData.entryDate,
          ExitDateTime: formData.exitDate || undefined
        },
        documents: documents,
        driver: {
          name: formData.driverName,
          birthDate: '',
          email: formData.driverEmail,
          phoneNumber: formData.driverPhone
        }
      };
      
      // Register trip with document MediaIDs
      const tripResponse = await registerTripService(tripPayload);
      console.log('Trip registration response:', tripResponse);
      
      Alert.alert('Success', 'Trip registered and documents uploaded successfully!');
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to register trip. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrevious = () => {
    prevStep();
  };

  const handleClear = () => {
    resetForm();
  };

  if (isLoading || submitting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>{isLoading ? 'Loading saved form data...' : 'Submitting form data...'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentStep > 0 && (
        <TouchableOpacity
          style={[styles.button, styles.previousButton, isFirstStep && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={isFirstStep}
        >
          <Text style={[styles.buttonText, isFirstStep && styles.disabledButtonText]}>Previous</Text>
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
          <Text style={styles.buttonText}>Register Trip</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
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
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: theme.colors.white,
  },
});
