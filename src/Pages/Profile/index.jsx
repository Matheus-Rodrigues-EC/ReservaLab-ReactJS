import React, {
  useEffect,
  useState,
} from "react";
import { Link, Navigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography } from "antd";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";

import {
  CargosList as Cargos,
  DisciplinasList as Disciplinas,
  TurnoList as Turnos
} from "../../Utils/Constants";

import SideMenu from "../../Components/SideMenu";

const Profile = () => {
  const [filteredCargos, setFilteredCargos] = useState(Cargos);
  const [filteredDisciplinas, setFilteredDisciplinas] = useState(Disciplinas);

  const handleSearchCargos = (value) => {
    if (!value) {
      setFilteredCargos(Cargos);
    } else {
      const filtered = Cargos?.filter((cargo) =>
        cargo.value.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCargos(filtered);
    }
  };

  const handleSearchDisciplinas = (value) => {
    if (!value) {
      setFilteredDisciplinas(Disciplinas);
    } else {
      const filtered = Disciplinas?.filter((disciplina) =>
        disciplina.value.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDisciplinas(filtered);
    }
  };

  const data = Constants?.data;

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
              <Typography.Title level={4} style={{ margin: 0 }}>Nome completo</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Cargo</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Apelido</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Disciplina</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Turno</Typography.Title>
            </Row>

            <Button
            type="danger"
                className="EditPasswordButton"
                onClick={() => console.log('alterar senha')}
              >
                Alterar Senha
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
                name='FullName'
                rules={[
                  { required: true, message: "Por favor, insira seu nome" },
                ]}
                className="FormItemProfile"
              >

                <Input
                  size="large"
                  placeholder="Nome Completo"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  type="text"
                />
              </Form.Item>

              <Form.Item
                name='Cargo'
                rules={[
                  { required: true, message: "Por favor selecione um cargo." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Cargo"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  onSearch={handleSearchCargos}
                  filterOption={false}
                >
                  {filteredCargos.map((cargo) => (
                    <Select.Option key={cargo?.id} values={cargo?.id} >
                      {cargo?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='Apelido'
                rules={[
                  { required: false, message: "Por favor digite seu Apelido." }
                ]}
                className="FormItemProfile"
              >
                <Input
                  size="large"
                  placeholder="Apelido"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  type="text"
                />
              </Form.Item>

              <Form.Item
                name='Disciplina'
                rules={[
                  { required: true, message: "Por favor selecione um disciplina." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Disciplina"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  onSearch={handleSearchDisciplinas}
                  filterOption={false}
                  onClick={() => console.log(this.value)}
                >
                  {filteredDisciplinas.map((disciplina) => (
                    <Select.Option key={disciplina?.key} value={disciplina?.key}>
                      {disciplina?.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='Turno'
                rules={[
                  { required: true, message: "Por favor selecione um turno." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Turno"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                >
                  {Turnos.map((turno) => (
                    <Select.Option key={turno?.key} value={turno?.key}>
                      {turno?.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="SaveButton"
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

export default Profile;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`