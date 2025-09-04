import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native';
import { theme } from '../theme/theme';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDateTime } from '../utils/dateUtils';

interface DateTimePickerFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
  required?: boolean;
  placeholder?: string;
  minDate?: Date;
}

const DateTimePickerField: React.FC<DateTimePickerFieldProps> = ({
  label,
  name,
  control,
  error,
  required,
  placeholder,
  minDate,
}) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [tempDate, setTempDate] = useState<Date | null>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const currentValue = value ? new Date(value) : new Date();
        const displayValue = value ? formatDateTime(new Date(value)) : '';

        const openPicker = () => {
          // Use current date as default if no value is set
          const now = new Date();
          const initialDate = value ? new Date(value) : now;
          
          // If minDate is provided and initialDate is before minDate, use minDate
          if (minDate && initialDate < minDate) {
            setTempDate(new Date(minDate));
          } else {
            setTempDate(initialDate);
          }
          
          setMode('date');
          setShow(true);
        };

        const handleChange = (event: any, selectedDate?: Date) => {
          // If user canceled or no date selected
          if (!selectedDate) {
            if (Platform.OS === 'android') {
              setShow(false);
            }
            return;
          }
          
          const newDate = new Date(selectedDate);
          const now = new Date();
          const minimumDate = minDate || now;
          
          if (mode === 'date') {
            // Store the selected date in tempDate
            const updatedDate = new Date(newDate);
            
            // Preserve time if we already have a value
            if (value) {
              const previousDate = new Date(value);
              updatedDate.setHours(previousDate.getHours());
              updatedDate.setMinutes(previousDate.getMinutes());
            } else {
              // If no previous value, set time to current time
              updatedDate.setHours(now.getHours());
              updatedDate.setMinutes(now.getMinutes());
            }
            
            // Ensure the date respects minimum date constraint
            // Only adjust time if the selected date is the same as minimum date
            // This allows future dates to be selected freely
            if (updatedDate.toDateString() === minimumDate.toDateString() && updatedDate < minimumDate) {
              updatedDate.setHours(minimumDate.getHours());
              updatedDate.setMinutes(minimumDate.getMinutes());
            }
            
            setTempDate(updatedDate);
            
            // For Android, show time picker after date is selected
            if (Platform.OS === 'android') {
              setShow(false);
              setTimeout(() => {
                setMode('time');
                setShow(true);
              }, 300);
            } else {
              // For iOS, just switch to time mode
              setMode('time');
            }
          } else {
            // Time was selected
            if (tempDate) {
              const finalDate = new Date(tempDate);
              finalDate.setHours(newDate.getHours());
              finalDate.setMinutes(newDate.getMinutes());
              
              // Only check time constraints if the date is the same as minimum date
              // This allows future dates to have any time
              const isMinimumDate = finalDate.toDateString() === minimumDate.toDateString();
              
              if (isMinimumDate) {
                const isPastTime = 
                  finalDate.getHours() < minimumDate.getHours() || 
                  (finalDate.getHours() === minimumDate.getHours() && 
                   finalDate.getMinutes() < minimumDate.getMinutes());
                
                // If time is in the past and date is the minimum date, adjust to minimum time
                if (isPastTime) {
                  finalDate.setHours(minimumDate.getHours());
                  finalDate.setMinutes(minimumDate.getMinutes());
                }
              }
              
              // Update the form value with the final date
              onChange(finalDate.toISOString());
            } else {
              // Fallback if tempDate is somehow null
              onChange(newDate.toISOString());
            }
            
            // Close the picker
            setShow(false);
          }
        };

        return (
          <View style={styles.container}>
            <Text style={styles.label}>
              {label}{required ? <Text style={styles.required}> *</Text> : ''}
            </Text>
            
            <TouchableOpacity
              style={[styles.input, error ? styles.inputError : null]}
              onPress={openPicker}
            >
              <Text style={displayValue ? styles.valueText : styles.placeholderText}>
                {displayValue || placeholder || 'Select date and time'}
              </Text>
            </TouchableOpacity>
            
            {error && <Text style={styles.errorText}>{error}</Text>}
            
            {show && Platform.OS === 'android' && (
              <DateTimePicker
                testID="dateTimePicker"
                value={tempDate || currentValue}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={handleChange}
                minimumDate={minDate || new Date()}
              />
            )}
            
            {Platform.OS === 'ios' && (
              <Modal
                visible={show}
                transparent={true}
                animationType="slide"
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                      <TouchableOpacity 
                        onPress={() => setShow(false)}
                        style={styles.modalButton}
                      >
                        <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      
                      <Text style={styles.modalTitle}>
                        {mode === 'date' ? 'Select Date' : 'Select Time'}
                      </Text>
                      
                      <TouchableOpacity 
                        onPress={() => {
                          if (mode === 'date') {
                            setMode('time');
                          } else {
                            if (tempDate) {
                              // Check against minimum date constraints
                              const minimumDate = minDate || new Date();
                              const isMinimumDate = tempDate.toDateString() === minimumDate.toDateString();
                              
                              if (isMinimumDate) {
                                const isPastTime = 
                                  tempDate.getHours() < minimumDate.getHours() || 
                                  (tempDate.getHours() === minimumDate.getHours() && 
                                   tempDate.getMinutes() < minimumDate.getMinutes());
                                
                                // If time is in the past and date is the minimum date, adjust to minimum time
                                if (isPastTime) {
                                  const adjustedDate = new Date(tempDate);
                                  adjustedDate.setHours(minimumDate.getHours());
                                  adjustedDate.setMinutes(minimumDate.getMinutes());
                                  onChange(adjustedDate.toISOString());
                                } else {
                                  onChange(tempDate.toISOString());
                                }
                              } else {
                                onChange(tempDate.toISOString());
                              }
                            }
                            setShow(false);
                          }
                        }}
                        style={styles.modalButton}
                      >
                        <Text style={styles.modalButtonText}>
                          {mode === 'date' ? 'Next' : 'Done'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={tempDate || currentValue}
                      mode={mode}
                      is24Hour={true}
                      display="spinner"
                      onChange={handleChange}
                      style={styles.iOSPicker}
                      minimumDate={minDate || new Date()}
                      themeVariant="light"
                      textColor="#000000"
                    />
                  </View>
                </View>
              </Modal>
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20, // Extra padding for iOS to account for home indicator
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalButton: {
    padding: 8,
  },
  modalButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  iOSPicker: {
    height: 200,
  },
  container: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontWeight: '600',
    fontSize: theme.typography.fontSize.md,
    marginBottom: theme.spacing.sm,
    color: theme.colors.dark,
  },
  required: {
    color: theme.colors.danger,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.light,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.dark,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    height: 56,
    justifyContent: 'center',
  },
  inputError: {
    borderColor: theme.colors.danger,
    backgroundColor: '#fff6f6',
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.fontSize.sm,
    marginTop: theme.spacing.xs,
  },
  valueText: {
    color: theme.colors.dark,
    fontSize: theme.typography.fontSize.md,
  },
  placeholderText: {
    color: '#888',
    fontSize: theme.typography.fontSize.md,
  },
});

export default DateTimePickerField;
