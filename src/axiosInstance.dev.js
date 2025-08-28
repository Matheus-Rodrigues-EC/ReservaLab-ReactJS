// src/axiosInstance.dev.js - Para desenvolvimento com proxy
import axios from "axios";

const axiosInstance = axios.create({
  // Em desenvolvimento, usa o proxy /api
  // Em produção, usa a variável de ambiente
  baseURL: import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_URL,
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
      // Token expirado ou inválido, redirecionar para login
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
