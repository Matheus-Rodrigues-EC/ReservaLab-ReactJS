// src/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Substitua pelo URL base da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

// Adicionar um interceptor para adicionar o token em todas as requisições
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).token : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adicionar um interceptor para tratar erro de autenticação (token expirado)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Caso o token seja inválido, redirecionar para o login
      window.location.href = "/login"; // ou <Navigate to="/login" replace /> se estiver usando React Router
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
