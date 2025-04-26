import React, { useState, useEffect, useRef } from "react";
import packageJson from '../../../package.json';
import { Link, useNavigate } from "react-router";
import axios from "axios";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";
import Logo from '../../assets/Logo.jpg';
import { UserDataContext } from '../../Providers/UserData';

import { CalendarOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Form, Input, Button, Typography, notification } from 'antd';


const Login = () => {
  const inputRef = useRef(null);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { setUserData } = React.useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();


  const Navigate = useNavigate()

  const goToHome = () => {
    Navigate('/home')
  }

  const login = async (body) => {

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, body);
      const user = { 
        id: response?.data?.user?.id, 
        name: response?.data?.user?.name, 
        email: response?.data?.user?.email, 
        surname: response?.data?.user?.surname, 
        rulets: response?.data?.user?.rulets, 
        shift: response?.data?.user?.shift, 
        subject: response?.data?.user?.subject,
      };
      const serializableUser = JSON.stringify(user);
      localStorage.setItem("userData", serializableUser);
      localStorage.setItem("token", response?.data?.token?.token);

      setUserData(user);
      goToHome();

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao fazer Login',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.',
        showProgress: true,
        duration: 2.5,
        placement: "top"
      });
      setTimeout(() => {
        setLoading(false);
      }, 2250);
    }
  }

  const onFinish = (values) => {
    setEmail(values.Email);
    setPassword(values.Password)
    login(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {

  }, [Email, Password]);

  return (
    <Container>
      {contextHolder}
      <Row justify='center' align='middle' style={{ height: '100vh' }}>
        <Col span={14}>
          <Row justify="center">
            <Avatar
              className="AvatarLogin"
              src={Logo || undefined}
              icon={!Logo ? <CalendarOutlined /> : undefined}
            />
          </Row>

          <Row justify="center" style={{ marginTop: "70px" }}>
            <Form
              name="login"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >

              <Form.Item
                name='email'
                rules={[
                  { required: true, message: "Por favor, insira seu e-mail" },
                  { pattern: Constants.emailRegex, message: "Por favor, insira um e-mail válido!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  ref={inputRef}
                  size="large"
                  placeholder="Email"
                  onChange={() => {
                    inputRef.current.focus({
                      cursor: 'end',
                    });
                  }}

                  className="InputLogin"
                  allowClear
                  type="text"
                  loading={loading}
                  disabled={loading}
                >

                </Input>
              </Form.Item>

              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira sua senha.',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="Senha"

                  className="InputLogin"
                  allowClear
                  type="password"
                  loading={loading}
                  disabled={loading}
                >

                </Input.Password>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="SubmitButtonLogin"
                  loading={loading}
                  disabled={loading}
                >
                  Login
                </Button>
              </Form.Item>

            </Form>


          </Row>
          <Row justify='center'>

            <Link to="/register" className="LinkButtonLogin" >
              Ainda não possui cadastro? Clique aqui.
            </Link>
          </Row>

        </Col>
      </Row>
      <Row>
        <Typography.Text className="VersionLogin">
          Versão: {packageJson.version}
        </Typography.Text>
      </Row>
    </Container>
  )
}

export default Login;

const Container = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`