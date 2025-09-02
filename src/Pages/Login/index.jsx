import React, { useState, useEffect, useRef } from "react";
import packageJson from '../../../package.json';
import { Link, useNavigate } from "react-router";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";
import Logo from '../../assets/Logo.jpg';
import { UserDataContext } from '../../Providers/UserData';
import Loading from "../../Components/Loading";

import { CalendarOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Form, Input, Button, Typography, notification } from 'antd';

import GoogleLoginComponent from "../../Components/GoogleLogin";


const Login = () => {
  const inputRef = useRef(null);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { setUserData } = React.useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [searchParams] = useSearchParams();

  const Navigate = useNavigate()
  // localStorage.clear();

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
    // errorInfo?.errorFields?.map((error) => {
    //   console.error(error?.errors[0])
    // })
    api.warning({
      message: 'Campos obrigatórios faltando',
      description: 'Por favor, revise os campos do formulário e tente novamente.',
      placement: 'top',
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // redirecionar para home
      goToHome();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  }, [Email, Password]);

  return (
    <Container>
      {contextHolder}
      {loading && <Loading />}
      <Row justify='center' align='middle' style={{ height: '90vh' }}>
        <Col span={24}>
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
              autoComplete="on"
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
                  disabled={loading}
                  className="InputLogin"
                  allowClear
                  type="password"
                  autoComplete="on"
                >

                </Input.Password>
              </Form.Item>

              <Form.Item>
                <Button
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
          <Row justify='space-around'>
            <Col span={12}>
              <Link to="/register" className="LinkButtonLogin" >
                Ainda não possui cadastro?
              </Link>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Link to="/forgot-password" className="LinkButtonLogin" >
                Esqueceu sua senha?
              </Link>
            </Col>
          </Row>

          <Row justify='center' style={{ marginTop: "20px" }}>
            <GoogleLoginComponent />
          </Row>

        </Col>
      </Row >
      <Row>
        <Typography.Text className="VersionLogin">
          Versão: {packageJson.version}
        </Typography.Text>
      </Row>
    </Container >
  )
}

export default Login;

const Container = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`