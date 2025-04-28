import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography, notification, Drawer } from "antd";
import axios from "axios";
import styled from "styled-components";
import "./Style.less";

import {
  CargosList as Cargos,
  DisciplinasList as Disciplinas,
  TurnoList as Turnos
} from "../../Utils/Constants";

import SideMenu from "../../Components/SideMenu";
import TopMenu from "../../Components/TopMenu";

const Profile = () => {
  const [form] = Form.useForm();
  const [filteredCargos, setFilteredCargos] = useState([]);
  const [filteredDisciplinas, setFilteredDisciplinas] = useState(Disciplinas);
  const [loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState();
  const [Visible, setVisible] = useState(false);
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));
  const editUser = JSON.parse(localStorage.getItem('EditUser'));
  const [api, contextHolder] = notification.useNotification();

  const getProfile = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/list/${id}`);
    setUserData(response?.data)
  }

  const updateProfile = async (id, body) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/user/${id}/update`, body);

      if(!editUser) {
        const user = {
          id: response?.data?.id,
          name: response?.data?.name,
          email: response?.data?.email,
          surname: response?.data?.surname,
          rulets: response?.data?.rulets,
          shift: response?.data?.shift,
          subject: response?.data?.subject,
        };
        const serializableUser = JSON.stringify(user);
        localStorage.setItem("userData", serializableUser);
      }

      api.success({
        message: 'Perfil atualizado!',
        description: 'As informações do perfil foram salvas com sucesso.',
        showProgress: true,
        duration: 2,
        placement: "top"
      });
      setTimeout(() => {
        getProfile(editUser || userData.id)
        setLoading(false);
      }, 1750);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao atualizar perfil',
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
  // const goToHome = () => {
  //   Navigate('/home')
  // }

  const onFinish = (values) => {
    // console.log('Success:');
    updateProfile((editUser || userData.id), values)
  };
  const onFinishFailed = (errorInfo) => {
    console.error(errorInfo?.values);
  };

  useEffect(() => {
    setFilteredCargos(Cargos);
    getProfile(editUser || userData.id)
  }, [editUser, userData.id]);

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
            <Row>
              <Typography.Text className="TextProfile" >Nome completo</Typography.Text>
            </Row>

            <Row>
              <Typography.Text className="TextProfile" >Cargo</Typography.Text>
            </Row>

            <Row>
              <Typography.Text className="TextProfile" >Apelido</Typography.Text>
            </Row>

            <Row>
              <Typography.Text className="TextProfile" >Disciplina</Typography.Text>
            </Row>

            <Row>
              <Typography.Text className="TextProfile" >Turno</Typography.Text>
            </Row>

            <Button
              className="EditPasswordButton"
              onClick={goToUpdatePassword}
              loading={loading}
              disabled={loading}
            >
              Alterar Senha
            </Button>
          </Col>
          <Col span={12} offset={2}>
            <Form
              form={form}
              name="Profile"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                name='name'
                initialValue={UserData?.name || ''}
                rules={[
                  { required: true, message: "Por favor, insira seu nome" },
                ]}
                className="FormItemProfile"
              >

                <Input
                  size="large"
                  placeholder="Nome Completo"
                  disabled={loading}
                  className="InputProfile"
                  allowClear
                  type="text"
                />
              </Form.Item>

              <Form.Item
                name='rulets'
                initialValue={UserData?.rulets || ''}
                rules={[
                  { required: true, message: "Por favor selecione um cargo." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Cargo"
                  disabled={loading || (userData?.rulets === 'Professor(a)') || (userData?.rulets === 'Apoio')}
                  className="InputProfile"
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
                  disabled={loading}
                  className="InputProfile"
                  allowClear
                  type="text"
                />
              </Form.Item>

              <Form.Item
                name='subject'
                initialValue={UserData?.subject || ''}
                rules={[
                  { required: true, message: "Por favor selecione um disciplina." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Disciplina"
                  disabled={loading || (userData?.rulets === 'Professor(a)') || (userData?.rulets === 'Apoio')}
                  className="InputProfile"
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
                initialValue={UserData?.shift || ''}
                rules={[
                  { required: true, message: "Por favor selecione um turno." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Turno"
                  disabled={loading || (userData?.rulets === 'Professor(a)') || (userData?.rulets === 'Apoio')}
                  className="InputProfile"
                  style={{ marginBottom: '50px'}}
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
                htmlType="submit"
                className="SaveButtonProfile"
                loading={loading}
                disabled={loading}
                onClick={() => localStorage.removeItem("EditUser")}
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

export default Profile;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`