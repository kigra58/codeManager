import { RootStackParamList } from "../utils/interfaces";

 
export const ROUTES :{[key: string]: keyof RootStackParamList}={
  LOGIN : 'Login',
  SIGNUP : 'Signup',
  PROFILE : 'Profile',
  DASHBOARD : 'Dashboard'
}