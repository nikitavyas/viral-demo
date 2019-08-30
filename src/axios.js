import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.1.75:4000/api/v1'
});
// Set the AUTH token for any request
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});
export default instance;