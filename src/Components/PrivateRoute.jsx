// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null = carregando, true = autorizado, false = não autorizado
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/validate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Erro ao verificar token:", error);
        setIsValid(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isValid === null) {
    return <p>Carregando...</p>; // ou um spinner bonitinho com Ant Design
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
