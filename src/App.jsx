import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import styled from "styled-components";
import Background from './assets/Background.png';

import Login from './Pages/Login'
import Cadastro from './Pages/Cadastro';

function App() {

  return (
    <Container>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={ <Login/> } />
          <Route path="/cadastro" element={ <Cadastro/> } />
        
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