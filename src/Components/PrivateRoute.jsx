// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Row } from 'antd';
import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null = carregando, true = autorizado, false = não autorizado
  // const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // setLoading(true);
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
      // finally {
      //   setLoading(false);
      // }
    };

    verifyToken();
  }, [token]);

  if (isValid === null) {
    return  <Row justify="center" >
              <Spin 
                indicator={<LoadingOutlined 
                  style={{ 
                    fontSize: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '45vh auto'
                  }} 
                  spin 
                />
              } />
            </Row>
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
