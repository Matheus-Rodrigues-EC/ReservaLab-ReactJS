import React, { 
  useState, 
  useEffect,
} from "react";
import { useNavigate } from "react-router";
import "./Style.less";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import styled from "styled-components";
import Logo from '../assets/Logo.jpg';
import { Row, Avatar, Button, Typography } from 'antd';

dayjs.locale("pt-br");

const SideMenu = () => {
  const [today, setToday] = useState();
  const [user, setUser] = useState('Professor(a)');
  const Navigate = useNavigate();

  const SetDate = () => {
    const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
    const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
    return dataCapitalizada;
  }

  const goToHome = () => {
    Navigate("/home");
  }

  const goToProfile = () => {
    Navigate("/Profile");
  };

  const goToClassroom = () => {
    Navigate("/classroom");
  };

  useEffect(() => {
    setToday(SetDate);
    setUser('Professor(a)');
  }, [today, user])

  return(
    <Container>
      <Row justify="center" style={{ marginTop: "50px" }} >
        <Avatar
          size={{
            xs: 75,
            sm: 100,
            md: 125,
            lg: 150,
            xl: 175,
            xxl: 200 }}
          src={Logo}
        />
      </Row>
      <Row justify="center" >
        <Typography.Title style={{ fontFamily: "Poppins, sans-serif", marginTop: '10px', fontSize: '2vw' }}>
          ReservaLab
        </Typography.Title>
      </Row>
      <Row justify="center" >
        <Typography.Title style={{ fontFamily: "Poppins, sans-serif", marginTop: '10px', fontSize: '1.15vw' }}>
          {today}
        </Typography.Title>
      </Row>
      <Row justify="center" >
        <Typography.Title style={{ fontFamily: "Poppins, sans-serif", marginTop: '10px', fontSize: '1.15vw' }}>
          Bem vindo(a) {user}
        </Typography.Title>
      </Row>

      <Button 
        className="ButtonMenu" 
        onClick={goToHome}
      >
        Inicio
      </Button>

      <Button 
        className="ButtonMenu" 
        onClick={goToProfile}
      >
        Perfil
      </Button>

      <Button 
        className="ButtonMenu" 
        onClick={() => alert('Fazer Reserva')}
      >
        Fazer Reserva
      </Button>

      <Button 
        className="ButtonMenu" 
        onClick={goToClassroom}
      >
        Cadastrar Sala
      </Button>

      <Button 
        className="ButtonMenu" 
        onClick={() => alert('Cadastrar Turma')}
      >
        Cadastrar Turma
      </Button>

      <Button 
        className="ButtonMenuExit" 
        onClick={() => alert('Sair')}
      >
        Sair
      </Button>

    
    </Container>
  )
}

export default SideMenu;


const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: rgba(121, 199, 217, 0.8);
`