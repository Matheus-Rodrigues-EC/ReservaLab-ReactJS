import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from 'react'
import styled from "styled-components";
import Background from './assets/Background.png';

import Login from './Pages/Login'
import Cadastro from './Pages/Cadastro';
import Home from "./Pages/Home";

function App() {

  return (
    <Container>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={ <Cadastro/> } />
          <Route path="/home" element={ <Home/> } />
        
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