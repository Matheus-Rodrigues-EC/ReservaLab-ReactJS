import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, notification, Button, Typography } from "antd";
import axios from "axios";
import { 
  LockOutlined,
} from '@ant-design/icons';
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";

import SideMenu from "../../Components/SideMenu";

const UpdatePassword = () => {
  const data = Constants?.data;
  const Navigate = useNavigate()
    const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [api, contextHolder] = notification.useNotification();

  const goToProfile = () => {
    Navigate('/profile')
  }

  const updatePasswordProfile = async (id, body) => {
      const config = {
        headers: {Authorization: `Bearer ${userData.token}`}
      }
      
      setLoading(true);
      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/user/${id}/update-password`, body, config);
    
        api.success({
          message: 'Senha atualizado!',
          description: 'A nova senha foi salva com sucesso.',
          showProgress: true,
          duration: 2,
          placement: "top"
        });
        setTimeout(() => {
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
      }finally{
        setLoading(false);
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
      <Col span={4}>
        <SideMenu />
      </Col>
      <Col span={20}>
        <div className="ContainerProfile">
          <Col span={10} style={{ display: 'flex', flexDirection: 'column', gap: '38px' }}>
            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Senha Atual</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Nova senha</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Confirmar nova Senha</Typography.Title>
            </Row>

            <Button
              type="danger"
              className="CancelSavePasswordButton"
              onClick={goToProfile}
              loading={loading}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Col>
          <Col span={14} offset={2} style={{}}>
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
                  style={{ width: '80%', height: 40 }}
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
                  style={{ width: '80%', height: 40 }}
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
                  style={{ width: '80%', height: 40 }}
                  dependencies={['password']}
                  allowClear
                >

                </Input.Password>
              </Form.Item>

              <Button
                type="primary"
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