import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from '../../assets/Logo.jpg'

import { CalendarOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, Form, Input, Button } from 'antd';


const Login = () => {
  const Email = useState("");
  const Password = useState("");

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {

  }, [Email, Password]);

  return (
    <Container>
      <Col span={12}>
        <Row justify="center" style={{ marginTop: "10%"}}>
          <Avatar
            size={{ xxl: 350 }}
            src={Logo || undefined}
            icon={!Logo ? <CalendarOutlined /> : undefined}
          />
        </Row>
        
        <Row justify="center" style={{marginTop: "70px"}}>
          <Form
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >

            <Form.Item
              name='Email'
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira seu e-mail.',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                size="large" 
                placeholder="Email" 

                style={{width: 600, height: 60}}
                allowClear
                type="text"
                // value={}
                onChange={() => console.log()}
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

                style={{width: 600, height: 60}}
                allowClear
                type="password"
                // value={}
                onChange={() => console.log()}
              >

              </Input.Password>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary" 
                htmlType="submit"
                style={{
                  margin: 'auto',
                  display: 'flex',
                  width: '400px',
                  height: '60px',
                  backgroundColor: '#79C7D9',
                  border: 'solid 3px',
                  borderColor: '#2BB9D9',
                  color: 'black'
                }}
                >
                  Login
                </Button>
            </Form.Item>

          </Form>
        </Row>

      </Col>
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