import React from "react";
import { useNavigate } from "react-router";
import { Row, Col, Button, Avatar } from "antd";
import styled from "styled-components";
import Logo from '../assets/Logo.jpg';

const VerifyYourEmail = () => {
  const navigate = useNavigate();

  return (
    <ContainerVerifyYourEmail>
      <Row justify="center">
        <Avatar
          className="AvatarLogin"
          src={Logo || undefined}
          icon={!Logo ? <CalendarOutlined /> : undefined}
        />
      </Row>
      <Card>
        <Row>
          <h2>Verifique seu e-mail</h2>
        </Row>
        <Row>
          <p>Um link de verificação foi enviado para o seu e-mail. Por favor, verifique sua caixa de entrada.</p>
        </Row>
        <Row>
          <Col>
            <Button type="primary" onClick={() => navigate("/")}>
              Voltar para a página inicial
            </Button>
          </Col>
        </Row>
      </Card>
    </ContainerVerifyYourEmail>
  );
};

export default VerifyYourEmail;

const ContainerVerifyYourEmail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(234, 234, 234, 0.85);
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1);
`;
