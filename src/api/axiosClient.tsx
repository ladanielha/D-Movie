import axios, {
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import queryString from 'query-string';

import apiConfig from './apiConfig';

// Definisikan tipe untuk konfigurasi API
interface ApiConfig {
    baseUrl: string;
    apiKey: string;
}

const apiConfigTyped: ApiConfig = apiConfig;

// Buat instance axios dengan konfigurasi
const axiosClient = axios.create({
    baseURL: apiConfigTyped.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params: Record<string, any>): string =>
        queryString.stringify({ ...params, api_key: apiConfigTyped.apiKey }),
});

// Interceptor untuk request
axiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        // Anda bisa memodifikasi config di sini jika diperlukan
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk response
axiosClient.interceptors.response.use(
    (response: AxiosResponse): any => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;
