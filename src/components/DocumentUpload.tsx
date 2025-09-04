import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform, Alert, Linking } from "react-native";
import { theme } from "../theme/theme";
import { Control, FieldErrors, Controller } from "react-hook-form";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';

interface DocumentUploadProps {
  title: string;
  field: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  required?: boolean;
}

export default function DocumentUpload({ title, field, control, errors, required = true }: DocumentUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Request camera permission for Android
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission to take pictures",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS will handle permissions through Info.plist
  };

  // Request storage permission for Android
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        // For Android 13+ (API level 33+)
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: "Photos Permission",
              message: "App needs access to your photos",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } 
        // For Android 12 and below
        else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: "Storage Permission",
              message: "App needs access to your photos",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS will handle permissions through Info.plist
  };

  // Handle taking a photo with camera
  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    
    if (!hasPermission) {
      if (Platform.OS === 'ios') {
        Alert.alert(
          'Permission Denied', 
          'Camera permission is required. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() }
          ]
        );
      } else {
        Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
      }
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 1200,
        maxWidth: 1200,
        quality: 0.8,
        saveToPhotos: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
          Alert.alert('Error', response.errorMessage || 'Something went wrong');
        } else if (response.assets && response.assets[0]) {
          const selectedImage = response.assets[0];
          setImagePreview(selectedImage.uri || null);
          // Extract file name from path or use a default name
          const name = selectedImage.fileName || 'camera_photo.jpg';
          setFileName(name);
        }
      },
    );
  };

  // Handle choosing from gallery
  const handleChooseFromGallery = async () => {
    const hasPermission = await requestStoragePermission();
    
    if (!hasPermission) {
      if (Platform.OS === 'ios') {
        Alert.alert(
          'Permission Denied', 
          'Photo library access is required. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() }
          ]
        );
      } else {
        Alert.alert('Permission Denied', 'Storage permission is required to select photos.');
      }
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 1200,
        maxWidth: 1200,
        quality: 0.8,
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', response.errorMessage || 'Something went wrong');
        } else if (response.assets && response.assets[0]) {
          const selectedImage = response.assets[0];
          setImagePreview(selectedImage.uri || null);
          // Extract file name from path or use a default name
          const name = selectedImage.fileName || 'camera_photo.jpg';
          setFileName(name);
        }
      },
    );
  };

  // Show image selection options
  const showImagePickerOptions = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: handleTakePhoto },
        { text: 'Choose from Gallery', onPress: handleChooseFromGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  return (
    <Controller
      control={control}
      name={field}
      render={({ field: { onChange, value } }) => {
        // Set preview if value exists
        React.useEffect(() => {
          if (value && !imagePreview) {
            if (typeof value === 'object' && value.uri) {
              setImagePreview(value.uri);
              setFileName(value.fileName || 'Selected Image');
            } else if (typeof value === 'string') {
              setImagePreview(value);
              // Extract filename from path if possible
              const pathParts = value.split('/');
              setFileName(pathParts[pathParts.length - 1] || 'Selected Image');
            }
          }
        }, [value]);
        
        // Update form value when imagePreview changes
        React.useEffect(() => {
          if (imagePreview) {
            // Save both URI and filename to form value
            onChange({
              uri: imagePreview,
              fileName: fileName || 'Selected Image'
            });
          }
        }, [imagePreview, fileName, onChange]);

        return (
          <View style={styles.container}>
            <Text style={styles.label}>{title} {required && <Text style={styles.required}>*</Text>}</Text>
            
            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={() => {
                showImagePickerOptions();
              }}
            >
              <Text style={styles.uploadButtonText}>Select Image</Text>
            </TouchableOpacity>
            
            {/* Display selected file name */}
            {fileName && (
              <View style={styles.fileInfoContainer}>
                <Text style={styles.fileNameText} numberOfLines={1} ellipsizeMode="middle">
                  {fileName}
                </Text>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => {
                    setImagePreview(null);
                    setFileName(null);
                    onChange(null);
                  }}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}

            {errors[field] && (
              <Text style={styles.errorText}>
                {typeof errors[field]?.message === "string" ? errors[field]?.message : "This field is required"}
              </Text>
            )}

            {/* Form value is updated through the useEffect hook */}
            
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
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
  uploadButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  uploadButtonText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: theme.typography.fontSize.md,
  },
  previewContainer: {
    marginBottom: theme.spacing.md,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  fileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.light,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  fileNameText: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.dark,
    marginRight: theme.spacing.sm,
  },
  removeButton: {
    backgroundColor: theme.colors.danger,
    padding: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  removeButtonText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: theme.typography.fontSize.sm,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.fontSize.sm,
    marginTop: theme.spacing.xs,
  },
});
