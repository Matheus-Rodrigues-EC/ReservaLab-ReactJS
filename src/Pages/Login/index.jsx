import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";
import Logo from '../../assets/Logo.jpg';

import { CalendarOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Form, Input, Button } from 'antd';


const Login = () => {
  const inputRef = useRef(null);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onFinish = (values) => {
    console.log('Success:');
    setEmail(values.Email);
    setPassword(values.Password)
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {

  }, [Email, Password]);

  return (
    <Container>
      <Row justify='center' align='middle' style={{ height: '100vh' }}>
        <Col span={14}>
          <Row justify="center">
            <Avatar
              size={{
                xs: 75,
                sm: 100,
                md: 150,
                lg: 200,
                xl: 250,
                xxl: 300
              }}
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
                name='Email'
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

                  style={{ width: '40vw', height: 60 }}
                  allowClear
                  type="text"
                >

                </Input>
              </Form.Item>

              <Form.Item
                name='Password'
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

                  style={{ width: '40vw', height: 60 }}
                  allowClear
                  type="password"
                  onChange={() => console.log()}
                >

                </Input.Password>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="SubmitButton"
                >
                  Login
                </Button>
              </Form.Item>

            </Form>


          </Row>
          <Row justify='center'>

            <Link to="/register" className="LinkButton">
              Ainda não possui cadastro? Clique aqui.
            </Link>

          </Row>

        </Col>
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