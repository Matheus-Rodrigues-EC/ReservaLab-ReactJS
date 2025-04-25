import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, notification, Button, Typography, Drawer } from "antd";
import axios from "axios";
import {
  LockOutlined,
} from '@ant-design/icons';
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";

import SideMenu from "../../Components/SideMenu";
import TopMenu from "../../Components/TopMenu";

const UpdatePassword = () => {
  const data = Constants?.data;
  const Navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [Visible, setVisible] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [api, contextHolder] = notification.useNotification();

  const goToProfile = () => {
    Navigate('/profile')
  }

  const updatePasswordProfile = async (id, body) => {
    setLoading(true);
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/user/${id}/update-password`, body);

      api.success({
        message: 'Senha atualizado!',
        description: 'A nova senha foi salva com sucesso.',
        showProgress: true,
        duration: 2,
        placement: "top"
      });
      setTimeout(() => {
        setLoading(false);
        goToProfile();
      }, 2250);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao atualizar senha',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.',
        showProgress: true,
        duration: 2,
        placement: "top"
      });
      setTimeout(() => {
        setLoading(false);
      }, 1750);
    }
  }

  const onFinish = (values) => {
    updatePasswordProfile(userData.id, values)
  };
  const onFinishFailed = (errorInfo) => {
    console.table(errorInfo?.values);
  };

  useEffect(() => {
  }, [data]);

  return (

    <Container>
      {contextHolder}
      {window.innerWidth < 1025 && (
        <Row className="TopMenu" >
          <TopMenu visible={Visible} setVisible={setVisible} />
        </Row>
      )}
      {window.innerWidth >= 1025 && (
        <Col span={4} className="SideMenu" >
          <SideMenu />
        </Col>
      )}
      <Col span={window.innerWidth < 1025 ? 24 : 20} style={window.innerWidth < 1025 ? { marginTop: '10vh' } : { marginTop: '1vh' }}>
        <div className="ContainerProfile">
          <Col span={10} style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            <Row justify='space-between'>
              <Typography.Text className="TextProfile">Senha Atual</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextProfile">Nova senha</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextProfile">Confirmar nova Senha</Typography.Text>
            </Row>

            <Button
              className="CancelSavePasswordButton"
              onClick={goToProfile}
              loading={loading}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Col>
          <Col span={12} offset={2}>
            <Form
              name="Profile"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                name='CurrentPassword'
                rules={[
                  { required: true, message: "Por favor, insira seu nome" },
                ]}
                className="FormItemProfile"
              >

                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="Senha Atual"
                  disabled={loading}
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Por favor, insira sua senha.' },
                  { pattern: Constants.passwordRegex, message: "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial." },
                ]}
                className="FormItemProfile"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="Nova Senha"
                  disabled={loading}
                  allowClear
                >

                </Input.Password>
              </Form.Item>

              {/* Confirm Password */}
              <Form.Item
                name='ConfirmNewPassword'
                rules={[
                  { required: true, message: 'Por favor, insira sua senha.' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('As senhas não correspondem!'));
                    },
                  }),
                ]}
                className="FormItemProfile"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="Confirme a nova Senha"
                  disabled={loading}
                  dependencies={['password']}
                  allowClear
                  style={{ marginBottom: '50px'}}
                >
                </Input.Password>
              </Form.Item>

              <Button
                htmlType="submit"
                className="SavePasswordButton"
                loading={loading}
                disabled={loading}
              >
                Salvar Alterações
              </Button>

            </Form>
          </Col>
        </div>

      </Col>

      <Drawer
        title="ReservaLab"
        placement="left"
        onClose={() => setVisible(false)}
        open={Visible}
        styles={{ body: { padding: 0 } }}
      >
        <SideMenu />
      </Drawer>
    </Container>
  )
}

export default UpdatePassword;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`