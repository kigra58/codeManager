import React, { useState } from "react";
import { ScrollView, SafeAreaView, Alert } from "react-native";
import TripInfoForm from "./TripInfo";
import DocumentUpload from "./DocumentUpload";
import DriverDetailsForm from "./DriverDetailsForm";
import Declaration from "./Declaration";
import FormActions from "./FormAction";
import Timer from "./Timer";


type FormType = {
  vehicleNumber: string;
  entryDate: string;
  exitDate: string;
  rcDoc: string;
  pucDoc: string;
  insuranceDoc: string;
  driverName: string;
  driverEmail: string;
  driverPhone: string;
  declaration: boolean;
};

export default function App() {
  const [form, setForm] = useState<FormType>({
    vehicleNumber: "",
    entryDate: "",
    exitDate: "",
    rcDoc: "",
    pucDoc: "",
    insuranceDoc: "",
    driverName: "",
    driverEmail: "",
    driverPhone: "",
    declaration: false,
  });

  const handleSubmit = () => {
    if (!form.declaration) {
      Alert.alert("Declaration Required", "You must agree to the declaration");
      return;
    }
    console.log("Form submitted:", form);
    Alert.alert("Success", "Trip Registered Successfully!");
  };

  const handleClear = () => {
    setForm({
      vehicleNumber: "",
      entryDate: "",
      exitDate: "",
      rcDoc: "",
      pucDoc: "",
      insuranceDoc: "",
      driverName: "",
      driverEmail: "",
      driverPhone: "",
      declaration: false,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        <Timer />
        <TripInfoForm form={form} setForm={setForm} />
        <DocumentUpload title="Registration Certificate (RC)" field="rcDoc" form={form} setForm={setForm} />
        <DocumentUpload title="Pollution Under Control (PUC)" field="pucDoc" form={form} setForm={setForm} />
        <DocumentUpload title="Insurance Certificate" field="insuranceDoc" form={form} setForm={setForm} />
        <DriverDetailsForm form={form} setForm={setForm} />
        <Declaration form={form} setForm={setForm} />
        <FormActions onClear={handleClear} onSubmit={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}
