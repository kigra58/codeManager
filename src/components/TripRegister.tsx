import React from 'react';
import {ScrollView, SafeAreaView, Alert, Text} from 'react-native';
import TripInfoForm from './TripInfo';
import DocumentUpload from './DocumentUpload';
import DriverDetailsForm from './DriverDetailsForm';
import Declaration from './Declaration';
import FormActions from './FormAction';
import Timer from './Timer';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {registerTripSchema} from '../schema/registerTripSchema';

type TripFormType = z.infer<typeof registerTripSchema>;

export default function TripRegister() {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<TripFormType>({
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
  });

  const onSubmit = (data: TripFormType) => {
    console.log('Form submitted:', data);
    Alert.alert('Success', 'Trip Registered Successfully!');
    reset();
  };

  const onClear = () => {
    reset();
  };

  // Pass form props to children: register, setValue, watch, errors
  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <ScrollView>
        <Timer />
        <TripInfoForm control={control} errors={errors} />
        <DocumentUpload
          title="Registration Certificate (RC)"
          field="rcDoc"
          control={control}
          errors={errors}
        />
        <DocumentUpload
          title="Pollution Under Control (PUC)"
          field="pucDoc"
          control={control}
          errors={errors}
        />
        <DocumentUpload
          title="Insurance Certificate"
          field="insuranceDoc"
          control={control}
          errors={errors}
        />
        <DriverDetailsForm control={control} errors={errors} />
        <Declaration control={control} errors={errors} />
        <FormActions onClear={onClear} onSubmit={handleSubmit(onSubmit)} />
        {/* Show top-level errors if needed */}
        {errors.declaration && (
          <Text style={{color: 'red', marginTop: 8}}>
            {errors.declaration.message}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
