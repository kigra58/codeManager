// components/common/FormDatePicker.tsx
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';

const FormDatePicker = forwardRef(<
  T extends FieldValues
>({
  control,
  name,
  rules = {},
  label,
  placeholder = "Select date",
  mode = "date",
  minimumDate,
  maximumDate,
  disabled = false,
  style,
  buttonStyle,
  textStyle,
  errorStyle,
  theme = "light",
  confirmText = "Confirm",
  cancelText = "Cancel",
  locale = "en",
  timeZoneOffsetInMinutes,
  ...datePickerProps
}: any, ref: React.Ref<any>) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const formatDate = (date: Date | null | undefined, formatMode: 'date' | 'time' | 'datetime'): string => {
    if (!date) return '';
    
    // Format functions that work reliably in React Native
    const formatTimeString = (d: Date): string => {
      if (!d || !(d instanceof Date) || isNaN(d.getTime())) {
        return '';
      }
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };
    
    const formatDateString = (d: Date): string => {
      if (!d || !(d instanceof Date) || isNaN(d.getTime())) {
        return '';
      }
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const year = d.getFullYear();
      return `${month}/${day}/${year}`;
    };
    
    switch (formatMode) {
      case 'time':
        return formatTimeString(date);
      case 'datetime':
        const dateStr = formatDateString(date);
        const timeStr = formatTimeString(date);
        return dateStr && timeStr ? `${dateStr} ${timeStr}` : '';
      case 'date':
        // For date mode, we still want to show the time in the display
        const dateString = formatDateString(date);
        const timeString = formatTimeString(date);
        return dateString && timeString ? `${dateString} ${timeString}` : '';
      default:
        return formatDateString(date);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        // Ensure value is a proper Date object when used
        const dateValue = value instanceof Date ? value : (value ? new Date(value) : null);
        return (
        <View style={[styles.container, style]}>
          {label && <Text style={styles.label}>{label}</Text>}
          
          <TouchableOpacity
            style={[
              styles.dateButton,
              buttonStyle,
              error && styles.errorBorder,
              disabled && styles.disabled,
            ]}
            onPress={() => !disabled && setOpen(true)}
            disabled={disabled}
            accessibilityLabel={label || placeholder}
          >
            <Text 
              style={[
                styles.dateButtonText,
                textStyle,
                !value && styles.placeholderText,
                error && styles.errorText,
              ]}
              numberOfLines={1}
            >
              {dateValue ? formatDate(dateValue, mode) : placeholder}
            </Text>
          </TouchableOpacity>

          {error && (
            <Text style={[styles.errorMessage, errorStyle]}>
              {error.message || 'This field is required'}
            </Text>
          )}

          <DatePicker
            modal
            open={open}
            date={dateValue instanceof Date ? dateValue : new Date()}
            onConfirm={(selectedDate: Date) => {
              setOpen(false);
              // Convert Date object to ISO string to avoid "Expecting string received date" error
              onChange(selectedDate.toISOString());
            }}
            onCancel={() => setOpen(false)}
            mode={mode}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            theme={theme}
            confirmText={confirmText}
            cancelText={cancelText}
            locale={locale}
            timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
            {...datePickerProps}
          />
        </View>
      );
      }}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  errorBorder: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
  },
  errorMessage: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.7,
  },
});

// Add display name for better debugging
FormDatePicker.displayName = 'FormDatePicker';

export default FormDatePicker;