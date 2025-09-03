import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../theme/theme';
import { useFormContext as useRHFContext } from 'react-hook-form';

export default function Step5Review() {
  const { watch } = useRHFContext();
  const formValues = watch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 5: Review Information</Text>
      <ScrollView style={styles.reviewContainer}>
        <SectionHeader title="Trip Information" />
        <ReviewItem label="Vehicle Number" value={formValues.vehicleNumber} />
        <ReviewItem label="Entry Date & Time" value={formValues.entryDate} />
        <ReviewItem label="Exit Date & Time" value={formValues.exitDate || 'Not specified'} />
        
        <SectionHeader title="Documents" />
        <ReviewItem label="RC Document" value={formValues.rcDoc ? 'Uploaded' : 'Not uploaded'} />
        <ReviewItem label="PUC Document" value={formValues.pucDoc ? 'Uploaded' : 'Not uploaded'} />
        <ReviewItem label="Insurance Document" value={formValues.insuranceDoc ? 'Uploaded' : 'Not uploaded'} />
        
        <SectionHeader title="Driver Details" />
        <ReviewItem label="Driver Name" value={formValues.driverName} />
        <ReviewItem label="Email" value={formValues.driverEmail} />
        <ReviewItem label="Phone" value={formValues.driverPhone} />
        
        <SectionHeader title="Declaration" />
        <ReviewItem 
          label="Agreement" 
          value={formValues.declaration ? 'Agreed to terms and conditions' : 'Not agreed'} 
        />
      </ScrollView>
      <Text style={styles.note}>
        Please review all information carefully before submitting.
      </Text>
    </View>
  );
}

const SectionHeader = ({ title }: { title: string }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const ReviewItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.reviewItem}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  reviewContainer: {
    maxHeight: 400,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
    color: theme.colors.primary,
  },
  reviewItem: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  label: {
    flex: 1,
    fontWeight: '500',
    color: theme.colors.text,
  },
  value: {
    flex: 2,
    color: theme.colors.dark,
  },
  note: {
    marginTop: theme.spacing.sm,
    fontStyle: 'italic',
    color: theme.colors.gray,
  },
});
