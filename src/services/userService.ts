import http from "../utils/axiosInstance";
import { ENDPOINTS } from "../routes/endpoints";

export const getUserDetailsService = async (id: number) => {
  const { data } = await http.get(`${ENDPOINTS.USERS.DETAILS}?id=${id}`);
  return data;
};

export const getUserByEmailService = async (email: string) => {
  const { data } = await http.get(`${ENDPOINTS.USERS.DETAILS}?email=${email}`);
  return data;
};

export const createNewUserService = async (args: {
    name: string;
    email: string;
    password: string;
}) => {
  const id = Math.floor(Math.random() * 1000);
  const { data } = await http.post(ENDPOINTS.USERS.CREATE, {id,...args});
  return data;
};
