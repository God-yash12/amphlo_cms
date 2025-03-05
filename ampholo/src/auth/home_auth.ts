import axios, { AxiosInstance } from "axios";
import { useAuth } from "../context/auth-context";


export const useAxios = (): AxiosInstance => {
    const { accessToken } = useAuth();

    const axiosPrivate: AxiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        
    });
    return axiosPrivate;
}