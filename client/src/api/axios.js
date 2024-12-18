import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3200'
        : 'https://pharmacare-be1.onrender.com',
});

export default axiosInstance;