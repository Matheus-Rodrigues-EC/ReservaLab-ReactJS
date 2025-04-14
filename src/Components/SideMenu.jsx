import React, {
  useState,
  useEffect,
} from "react";
import packageJson from '../../package.json';
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
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();

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

  const goToReservation = () => {
    Navigate("/reservation");
  };

  const goToClassroom = () => {
    Navigate("/classroom");
  };

  const goToclass = () => {
    Navigate("/class");
  };


  const handleLogout = () => {
    // Limpar dados do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    // Redirecionar para a página de login
    navigate("/login");
  };

  const Exit = () => {
    handleLogout();
  }

  useEffect(() => {
    setToday(SetDate);
    setUser(userData?.surname || userData?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today, user])

  return (
    <Container>
      <Row justify="center" style={{ marginTop: "50px" }} >
        <Avatar
          size={{
            xs: 75,
            sm: 100,
            md: 125,
            lg: 150,
            xl: 175,
            xxl: 200
          }}
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
          Bem vindo(a) {user}.
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
        onClick={goToReservation}
      >
        Fazer Reserva
      </Button>

      {(userData?.rulets === 'Diretor(a)' || userData?.rulets === 'Coordenador(a)') &&
        <Button
          className="ButtonMenu"
          onClick={goToClassroom}
        >
          Cadastrar Sala
        </Button>
      }

      {(userData?.rulets === 'Diretor(a)' || userData?.rulets === 'Coordenador(a)') &&
        <Button
          className="ButtonMenu"
          onClick={goToclass}
        >
          Cadastrar Turma
        </Button>
      }
      <Button
        className="ButtonMenuExit"
        onClick={Exit}
      >
        Sair
      </Button>

      <Typography.Text className="Version">
        Versão: {packageJson.version}
      </Typography.Text>


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