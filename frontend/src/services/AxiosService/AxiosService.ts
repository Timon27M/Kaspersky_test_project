import axios from 'axios';

export const AxiosService = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});
