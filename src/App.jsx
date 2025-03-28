import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from 'react'
import styled from "styled-components";
import Background from './assets/Background.png';

import Login from './Pages/Login'
import Cadastro from './Pages/Cadastro';
import Home from "./Pages/Home"
import Profile from "./Pages/Profile";
import UpdatePassword from "./Pages/Profile/UpdatePassword";
import Classroom from "./Pages/Classroom";
import Class from "./Pages/Class";
import Reservation from "./Pages/Reservation";

function App() {

  return (
    <Container>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={ <Cadastro/> } />
          <Route path="/home" element={ <Home/> } />
          <Route path="/profile" element={ <Profile/> } />
          <Route path="/profile/updatePassword" element={ <UpdatePassword/> } />
          <Route path="/classroom" element={ <Classroom/> } />
          <Route path="/class" element={ <Class/> } />
          <Route path="/reservation" element={ <Reservation/> } />
        
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
  background-attachment: fixed;
`