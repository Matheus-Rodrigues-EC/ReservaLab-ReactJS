import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography } from "antd";
import axios from "axios";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import { UserDataContext } from '../../Providers/UserData';
import "./Style.less";

import {
  CargosList as Cargos,
  DisciplinasList as Disciplinas,
  TurnoList as Turnos
} from "../../Utils/Constants";

import SideMenu from "../../Components/SideMenu";

const Profile = () => {
  const [form] = Form.useForm();
  const [filteredCargos, setFilteredCargos] = useState([]);
  const [filteredDisciplinas, setFilteredDisciplinas] = useState(Disciplinas);
  const [UserData, setUserData] = useState();
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));

  const getProfile = async (id) => {
    const config = {
      headers: {Authorization: `Bearer ${userData.token}`},
    }
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/list/${id}`, config);
    console.log(response.data);
    setUserData(response.data)
  }

  const updateProfile = async (id, body) => {
    const config = {
      headers: {Authorization: `Bearer ${userData.token}`}
    }
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/user/${id}/update`, body, config);
    console.log(response.data);
  }

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

  const goToUpdatePassword = () => {
    Navigate('/profile/updatePassword')
  }

  const onFinish = (values) => {
    console.log('Success:');
    console.table(values);
    updateProfile(userData.id, values)
  };
  const onFinishFailed = (errorInfo) => {
    console.table(errorInfo?.values);
  };

  useEffect(() => {
    setFilteredCargos(Cargos);
    getProfile(userData.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.id]);

  useEffect(() => {
    if (UserData) {
      form.setFieldsValue({
        name: UserData.name,
        rulets: UserData.rulets,
        surname: UserData.surname,
        subject: UserData.subject,
        shift: UserData.shift,
      });
    }
  }, [UserData, form]);

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
                onClick={goToUpdatePassword}
              >
                Alterar Senha
              </Button>
          </Col>
          <Col span={14} offset={2} style={{}}>
            <Form
              form={form}
              name="Profile"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                name='name'
                initialValue={UserData?.name}
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
                name='rulets'
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
                    <Select.Option key={cargo?.label} values={cargo?.label} >
                      {cargo?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='surname'
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
                name='subject'
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
                  // allowClear
                  onSearch={handleSearchDisciplinas}
                  filterOption={false}
                >
                  {filteredDisciplinas.map((disciplina) => (
                    <Select.Option key={disciplina?.label} value={disciplina?.label}>
                      {disciplina?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='shift'
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
                    <Select.Option key={turno?.label} value={turno?.label}>
                      {turno?.label}
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