import React, { 
  useState, 
  useEffect,
} from "react";
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

  const SetDate = () => {
    const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
    const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
    return dataCapitalizada;
  }

  useEffect(() => {
    setToday(SetDate);
    setUser('Professor(a)');
  }, [today, user])

  return(
    <Container>
      <Row justify="center" style={{ marginTop: "50px" }} >
        <Avatar
          size={{ xxl: 200 }}
          src={Logo || undefined}
          icon={Logo}
        />
      </Row>
      <Row justify="center" >
        <Typography.Title level={1} style={{ fontFamily: "Poppins, sans-serif", marginTop: '10px' }}>
          ReservaLab
        </Typography.Title>
      </Row>
      <Row justify="center" >
        <Typography.Title level={4}>
          {today}
        </Typography.Title>
      </Row>
      <Row justify="center" >
        <Typography.Title level={4}>
          Bem vindo(a) {user}
        </Typography.Title>
      </Row>

      <Button 
        className="ButtonMenu" 
        onClick={() => alert('Inicio')}
      >
        Inicio
      </Button>

      <Button 
        className="ButtonMenu" 
        onClick={() => alert('Perfil')}
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
        onClick={() => alert('Cadastrar Sala')}
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