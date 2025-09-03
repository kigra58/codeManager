import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';
import { registerTripSchema } from '../schema/registerTripSchema';

// Storage keys
const FORM_DATA_KEY = 'form_data';
const CURRENT_STEP_KEY = 'current_step';

// Type for form data
type TripFormType = z.infer<typeof registerTripSchema>;

/**
 * Save form data to AsyncStorage
 * @param data Form data to save
 */
export const saveFormData = async (data: Partial<TripFormType>): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(FORM_DATA_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving form data:', error);
  }
};

/**
 * Get form data from AsyncStorage
 * @returns Form data or null if not found
 */
export const getFormData = async (): Promise<Partial<TripFormType> | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FORM_DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting form data:', error);
    return null;
  }
};

/**
 * Save current form step to AsyncStorage
 * @param step Current step number
 */
export const saveCurrentStep = async (step: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(CURRENT_STEP_KEY, step.toString());
  } catch (error) {
    console.error('Error saving current step:', error);
  }
};

/**
 * Get current form step from AsyncStorage
 * @returns Current step number or 1 if not found
 */
export const getCurrentStep = async (): Promise<number> => {
  try {
    const step = await AsyncStorage.getItem(CURRENT_STEP_KEY);
    return step != null ? parseInt(step, 10) : 1;
  } catch (error) {
    console.error('Error getting current step:', error);
    return 1;
  }
};

/**
 * Clear all form data and step information from AsyncStorage
 */
export const clearFormStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([FORM_DATA_KEY, CURRENT_STEP_KEY]);
  } catch (error) {
    console.error('Error clearing form storage:', error);
  }
};

/**
 * Update form data with new values
 * @param newData New form data to merge with existing data
 */
export const updateFormData = async (newData: Partial<TripFormType>): Promise<void> => {
  try {
    const existingData = await getFormData() || {};
    const updatedData = { ...existingData, ...newData };
    await saveFormData(updatedData);
  } catch (error) {
    console.error('Error updating form data:', error);
  }
};
