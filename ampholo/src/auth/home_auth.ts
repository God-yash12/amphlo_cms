import axios, { AxiosInstance } from "axios";

export const UseAxiosPrivate = (): AxiosInstance => {
    const axiosPrivate: AxiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}`
    });
    
    return axiosPrivate;
}