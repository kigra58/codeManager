import { ENDPOINTS } from '../routes/endpoints';
import http from '../utils/axiosInstance';
import { IDocumentUpload, IPayload } from '../utils/interfaces';

export const registerTripService = async (payload: IPayload) => {
  const {data} = await http.post(`${ENDPOINTS.TRIP.REGISTER}`, payload);
  return data;
};


export const documentUploadService = async (payload: IDocumentUpload) => {
  const {data} = await http.post(`${ENDPOINTS.TRIP.DOCUMENT_UPLOAD}`, payload);
  return data;
};

