import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from 'react'
import axios from "axios";
import styled from "styled-components";
import Background from './assets/Background.png';

import Login from './Pages/Login'
import Cadastro from './Pages/Cadastro';
import Home from "./Pages/Home"
import Profile from "./Pages/Profile";
import Users from "./Pages/Profile/Users";
import UpdatePassword from "./Pages/Profile/UpdatePassword";
import Classroom from "./Pages/Classroom";
import Classes from "./Pages/Class/Classes";
import Class from "./Pages/Class";
import Reservation from "./Pages/Reservation";
import PrivateRoute from "./Components/PrivateRoute";
import NotFound from "./Utils/NotFound";

function App() {

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

  }, [])

  return (
    <Container>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Cadastro />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/users" element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/profile/updatePassword" element={
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          } />
          <Route path="/classroom" element={
            <PrivateRoute>
              <Classroom />
            </PrivateRoute>
          } />
          <Route path="/classes" element={
            <PrivateRoute>
              <Classes />
            </PrivateRoute>
          } />
          <Route path="/class" element={
            <PrivateRoute>
              <Class />
            </PrivateRoute>
          } />
          <Route path="/reservation" element={
            <PrivateRoute>
              <Reservation />
            </PrivateRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: scroll;
`