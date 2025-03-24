import React, {
  useEffect,
  // useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography } from "antd";
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
  //   if (!value) {
  //     setFilteredCargos(Cargos);
  //   } else {
  //     const filtered = Cargos?.filter((cargo) =>
  //       cargo.value.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setFilteredCargos(filtered);
  //   }
  // };

  // const handleSearchDisciplinas = (value) => {
  //   if (!value) {
  //     setFilteredDisciplinas(Disciplinas);
  //   } else {
  //     const filtered = Disciplinas?.filter((disciplina) =>
  //       disciplina.value.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setFilteredDisciplinas(filtered);
  //   }
  // };

  const goToProfile = () => {
    Navigate('/profile')
  }

  const onFinish = (values) => {
    console.log('Success:');
    console.table(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.table(errorInfo?.values);
  };

  useEffect(() => {

  }, [data]);

  return (

    <Container>
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
                name='NewPassword'
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
                      if (!value || getFieldValue('Password') === value) {
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