import React, { useState, useEffect, useRef } from "react";
import packageJson from '../../../package.json';
import { Link, useNavigate } from "react-router";
import axios from "axios";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";
import Logo from '../../assets/Logo.jpg';

import { 
  CalendarOutlined, 
  MailOutlined, 
  UserAddOutlined, 
  LockOutlined,
} from '@ant-design/icons';
import { Row, Col, Avatar, Form, Input, Button, Typography } from 'antd';


const Cadastro = () => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const Navigate = useNavigate()

  const goToLogin = () => {
    Navigate('/login')
  }

  const Register = async (data) => {
    const { name, email, password } = data;
    const body = { name, email, password }
    console.log(body);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, body );
    console.log(response.data);
    goToLogin();
  }
  
  const onFinish = (values) => {
    console.log('Success:');
    setFullName(values.FullName);
    setEmail(values.Email);
    setPassword(values.Password);
    Register(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {

  }, [FullName, Email, Password ]);

  return (
    <Container>
      <Row justify='center' align='middle' style={{height: '100vh'}}>
        <Col span={14}>
          <Row justify="center">
            <Avatar
              size={{
                xs: 75,
                sm: 100,
                md: 150,
                lg: 200,
                xl: 250,
                xxl: 300 }}
              src={Logo || undefined}
              icon={!Logo ? <CalendarOutlined /> : undefined}
            />
          </Row>

          <Row justify="center" style={{ marginTop: "20px" }}>
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >

              {/* Fullname */}
              <Form.Item
                name='name'
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira seu nome.',
                  },
                ]}
              >
                <Input
                  prefix={<UserAddOutlined />}
                  ref={inputRef}
                  size="large"
                  placeholder="Nome copleto"

                  style={{ width: '40vw', height: 60 }}
                  allowClear
                  type="text"
                >

                </Input>
              </Form.Item>

              {/* Email */}
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: 'Por favor, insira seu e-mail.'},
                  { pattern: Constants.emailRegex, message: "Por favor, insira um e-mail válido!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  size="large"
                  placeholder="Email"

                  style={{ width: '40vw', height: 60 }}
                  allowClear
                  type="text"
                  // onChange={() => console.log()}
                >

                </Input>
              </Form.Item>

              {/* Password */}
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Por favor, insira sua senha.'},
                  { pattern: Constants.passwordRegex, message: "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial." },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="Senha"

                  style={{ width: '40vw', height: 60 }}
                  allowClear
                >

                </Input.Password>
              </Form.Item>

              {/* Confirm Password */}
              <Form.Item
                name='ConfirmPassword'
                rules={[
                  { required: true, message: 'Por favor, insira sua senha.'},
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('As senhas não correspondem!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="Confirme a Senha"
                  dependencies={['password']}

                  style={{ width: '40vw', height: 60 }}
                  allowClear
                  // onChange={() => validatePassword()}
                >

                </Input.Password>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="SubmitButton"
                >
                  Cadastrar
                </Button>
              </Form.Item>

            </Form>


          </Row>
          <Row justify='center'>

            <Link to="/login" className="LinkButton">
              Já possui cadastro? Acesse aqui.
            </Link>
          </Row>
          <Row>
            <Typography.Text className="Version" style={{ marginTop: "10%" }}>
              Versão: {packageJson.version}
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Cadastro;

const Container = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`