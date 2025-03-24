import React, {
  useEffect,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography } from "antd";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";

import {
  TurmaList as Turmas,
  TurnoList as Turnos,
} from "../../Utils/Constants";

import SideMenu from "../../Components/SideMenu";

const Class = () => {
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
        <div className="ContainerProfile">
          <Col span={10} style={{ display: 'flex', flexDirection: 'column', gap: '38px'}}>
            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Série/Ano</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Turma</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Turno</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Obervação</Typography.Title>
            </Row>

            <Button
            type="danger"
                className="CancelClassButton"
                onClick={goToHome}
              >
                Cancelar
              </Button>
          </Col>
          <Col span={14} offset={2} style={{}}>
            <Form
              name="Série"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                name='Série/Ano'
                rules={[
                  { required: true, message: "Por favor, insira a série/ano da turma." },
                  { pattern: Constants.serieRegex, message: "Por favor, insira uma série/ano válida!" },
                ]}
                className="FormItemProfile"
              >

                <Input
                  size="large"
                  placeholder="Série/Ano"
                  suffix='º'
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  type="number"
                  min='1'
                  max='9'
                />
              </Form.Item>

              <Form.Item
                name='Turma'
                rules={[
                  { required: true, message: "Por favor insira a turma referente a série." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  size="large"
                  placeholder="Turma"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                >
                  {Turmas.map((turma) => (
                    <Select.Option key={turma?.id} values={turma?.id} >
                      {turma?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='Turno'
                rules={[
                  { required: true, message: "Por favor selecione o turno da turma." },
                ]}
                className="FormItemProfile"
              >
                <Select
                  size="large"
                  placeholder="Turno"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                >
                  {Turnos.map((turno) => (
                    <Select.Option key={turno?.id} values={turno?.id} >
                      {turno?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='Obervação'
                rules={[
                  { required: false, message: "Gostaria de adicionar alguma Obervação?" }
                ]}
                className="FormItemProfile"
              >
                <Input
                  showSearch
                  size="large"
                  placeholder="Gostaria de adicionar alguma Obervação?"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  type="textarea"
                >
                </Input>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="ClassButton"
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

export default Class;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`