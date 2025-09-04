import { ENDPOINTS } from '../routes/endpoints';
import http from '../utils/axiosInstance';

export const registerTripService = async (tripData: any) => {
  const {data} = await http.post(`${ENDPOINTS.TRIP.REGISTER}`, tripData);
  return data;
};