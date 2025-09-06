export type FormType = {
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
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  Home: undefined;
  Profile: undefined;
  TripRegister: undefined;
};






interface IDocument {
  documentType: "RC" | "PUCC" | "INSURANCE" | "DL";
  number: string;
  issueDate: string;
  expiryDate: string;
}

interface IVehicle {
  number: string;
}

interface ITrip {
  EntryDateTime: string;
  ExitDateTime?: string;
}

interface IDriver {
  name: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
}

export interface IPayload {
  vehicle: IVehicle;
  trip: ITrip;
  documents: IDocument[];
  driver: IDriver;
}


export interface IDocumentUpload {
  document_type:string;
  file:File;
};
