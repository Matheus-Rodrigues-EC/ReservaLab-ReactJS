import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import styled from "styled-components";
import { Form, Row, Col, Typography, Input, Button, notification, Avatar } from 'antd';
import Logo from '../../assets/Logo.jpg';
import "./Style.less";
import Loading from "../../Components/Loading";

const ForgotPassword = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const goToVerifyEmail = () => {
    navigate('/verify-email');
  }


  const verifyEmail = async (email) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/user/recover-password`, { email });
      goToVerifyEmail();
      return response.data;
    } catch (error) {
      console.error('Error verifying email:', error);
      api.warning({
        message: 'Nao encontrado.',
        description: 'O email digitado não está cadastrado no sistema.',
        placement: 'top',
        showProgress: true,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    verifyEmail(values.email);
  };
  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
    // errorInfo?.errorFields?.map((error) => {
    //   console.error(error?.errors[0])
    // })
    api.warning({
      message: 'Campos obrigatórios faltando',
      description: 'Por favor, revise os campos do formulário e tente novamente.',
      placement: 'top',
    });
  };

  return (
    <Container>
      {contextHolder}
      {loading && <Loading />}
      <Col span={20}>
        <Row justify="center">
          <Avatar
            className="AvatarLogin"
            src={Logo || undefined}
            icon={!Logo ? <CalendarOutlined /> : undefined}
          />
        </Row>
        <Typography.Title level={2}>Esqueceu sua senha?</Typography.Title>
        <Typography.Paragraph>Digite seu e-mail para recuperar sua senha</Typography.Paragraph>
        <Form
          layout="vertical"
          name="forgot-password"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            name='email'
            rules={[
              { required: true, message: "Por favor, insira seu e-mail" },
              { type: "email", message: "Por favor, insira um e-mail válido" },
            ]}
          >
            <Input placeholder="E-mail" size="large" disabled={loading} />
          </Form.Item>
          <Form.Item>
            <Button className="SubmitButtonRecover" htmlType="submit" disabled={loading} loading={loading}>
              Recuperar
            </Button>
          </Form.Item>
        </Form>

        <Row justify='space-around'>
          <Col span={12}>
            <Link to="/login" className="LinkButtonLogin" >
              Ir para o Login
            </Link>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Link to="/register" className="LinkButtonLogin" >
              Cadastrar usuário
            </Link>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default ForgotPassword;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
