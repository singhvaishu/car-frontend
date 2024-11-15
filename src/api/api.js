import axios from 'axios';

const API = axios.create({ baseURL: 'https://car-backend-sftj.onrender.com/api' });
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

// Auth APIs
export const signUp = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);

// Car APIs
export const createCar = (carData) => API.post('/cars', carData);
export const getCars = () => API.get('/cars');
export const getCarById = (id) => API.get(`/cars/${id}`);
export const updateCar = (id, carData) => API.put(`/cars/${id}`, carData);
export const deleteCar = (id) => API.delete(`/cars/${id}`);
