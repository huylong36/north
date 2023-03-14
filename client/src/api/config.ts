import axios, { AxiosRequestConfig } from "axios";
import Cookie from "js-cookie";

export const ENDPOINT_LOCAL = process.env.REACT_APP_ENDPOINT;
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = `${ENDPOINT_LOCAL}`;
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.timeout = 20000;
axiosInstance.defaults.headers = { "Content-Type": "application/json" };
axiosInstance.defaults.headers = { "Access-Control-Allow-Origin": "http://localhost:3003" };
axiosInstance.defaults.headers = { "Access-Control-Allow-Credentials": "true" };
axiosInstance.defaults.headers = Cookie.get("token") && { Authorization: `Bearer ${Cookie.get("token")}` };

export const ApiConfig = async (url: string, payload?: any, _method = "POST") => {
    const method = _method.toLowerCase() as AxiosRequestConfig["method"];
    const config: AxiosRequestConfig = {
        url,
        method,
        data: payload
    };
    return axiosInstance.request(config);
}


export const ApiUploadFile = async (url: string, file: string | Blob, fieldName = "file") => {
    const formData = new FormData();
    formData.append(fieldName, file)
    return axiosInstance.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
