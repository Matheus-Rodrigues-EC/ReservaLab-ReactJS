import React, {
  useEffect,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography } from "antd";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";

import SideMenu from "../../Components/SideMenu";

const Classroom = () => {
  const data = Constants?.data;
  const Navigate = useNavigate()

  const goToHome = () => {
    Navigate('/home')
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
        <div className="ContainerClassroom">
          <Col span={10} style={{ display: 'flex', flexDirection: 'column', gap: '38px'}}>
            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Nome da Sala</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Capacidade da Sala</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Descrição</Typography.Title>
            </Row>

            <Button
            type="danger"
                className="CancelClassroomButton"
                onClick={goToHome}
              >
                Cancelar
              </Button>
          </Col>
          <Col span={14} offset={2} style={{}}>
            <Form
              name="Create_Classroom"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                name='Classroom Name'
                rules={[
                  { required: true, message: "Por favor, insira um nome para a sala" },
                ]}
                className="FormItemProfile"
              >

                <Input
                  size="large"
                  placeholder="Nome da Sala"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  type="text"
                />
              </Form.Item>

              <Form.Item
                name='Capacidade_da_Sala'
                rules={[
                  { required: true, message: "Por favor selecione a capacidade da sala." },
                  { pattern: Constants.numberRegex, message: "Por favor, insira um valor válido!" },
                ]}
                className="FormItemProfile"
              >
                <Input
                  size="large"
                  placeholder="Capacidade da Sala"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  type="number"
                  min='10'
                  max='100'
                />
              </Form.Item>

              <Form.Item
                name='Descrição'
                rules={[
                  { required: false, message: "Gostaria de adicionar alguma descrição?" }
                ]}
                className="FormItemProfile"
              >
                <Input
                  showSearch
                  size="large"
                  placeholder="Gostaria de adicionar alguma descrição?"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  type="textarea"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="ClassroomButton"
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

export default Classroom;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`