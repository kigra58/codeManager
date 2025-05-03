import { ENDPOINTS } from '../routes/endpoints';
import http from '../utils/axiosInstance';

export const loginService = async (email: string, password: string) => {
  const {data} = await http.get(`${ENDPOINTS.AUTH.LOGIN}`, { params: { email, password } });
  return data;
};

export const signupService = async (email: string, password: string) => {
  const {data} = await http.post(`${ENDPOINTS.AUTH.SIGNUP}`, { email ,password} );
  return data;
};
