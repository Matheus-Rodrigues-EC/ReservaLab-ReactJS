import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Tag, Button, Typography, notification, Drawer, Popconfirm, List, message } from "antd";
import { EditTwoTone, DeleteTwoTone, QuestionCircleOutlined } from '@ant-design/icons'
import axios from "axios";
import styled from "styled-components";
import "./Style.less";

import SideMenu from "../../Components/SideMenu";
import TopMenu from "../../Components/TopMenu";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState();
  const [users, setUsers] = useState();
  const [Visible, setVisible] = useState(false);
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolder2] = message.useMessage();

  const getProfile = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/list/${id}`);
    setUserData(response.data)
  }

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/list/`);
      const sortedUsers = response?.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setUsers(sortedUsers);

      setLoading(false);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao carregar usuários',
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

  const cancel = () => {
    messageApi.open({
      type: 'warning',
      content: 'Exclusão cancelada',
    });
  };

  const editUser = async (id) => {
    localStorage.setItem("EditUser", id);
    Navigate(`/profile`);
  }

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/list/${id}`);

      api.success({
        message: 'Usuário excluido com sucesso!',
        description: 'As informações do perfil do usuário foram deletadas.',
        showProgress: true,
        duration: 2,
        placement: "top",
      });
      setTimeout(() => {
        getUsers();
        setLoading(false);
      }, 1750);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao carregar usuários',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.',
        showProgress: true,
        duration: 2,
        placement: "top",
      });
      setTimeout(() => {
        setLoading(false);
      }, 1750);
    }
  }

  useEffect(() => {
    getProfile(userData.id)
    getUsers();
    localStorage.removeItem("EditUser");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.id]);

  useEffect(() => {
    localStorage.removeItem("EditUser");
  }, [loading, users]);

  return (

    <Container>
      {contextHolder}
      {contextHolder2}
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
      <Col span={window.innerWidth < 1025 ? 24 : 20} style={window.innerWidth < 1025 ? { marginTop: '5vh' } : { marginTop: '1vh' }}>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>Usuários</Typography.Title>
        <div className="ContainerUsers">
          <List
            loading={loading}
            dataSource={users}
            className="ListUsers"
            renderItem={(user) => (
              <List.Item
                extra={
                  (userData?.rulets === 'Diretor(a)' ||
                    userData?.rulets === 'Coordenador(a)') && (
                    <>
                      <Button
                        type="icon"
                        style={{ fontSize: '1.25rem' }}
                        onClick={() => editUser(user?.id)}
                      >
                        <EditTwoTone twoToneColor="#FFA500" />
                      </Button>
                      <Popconfirm
                        title="Excluir usuário"
                        description={
                          <>
                            <Typography.Text>
                              Tem certeza que deseja excluir o usuário, todas as reservas ligadas a este usuário serão deletadas?
                            </Typography.Text>
                          </>
                        }
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => deleteUser(user?.id)}
                        onCancel={cancel}
                        okText="Deletar"
                        cancelText="Cancelar"
                      >
                        <Button
                          type="icon"
                          style={{ fontSize: '1.25rem' }}
                        >
                          <DeleteTwoTone twoToneColor="#F00" />
                        </Button>
                      </Popconfirm>
                    </>
                  )
                }
              >
                <List.Item.Meta
                  title={
                    <Typography.Text className="UsersName">{user?.name} {user?.surname ? ` -  ${user.surname}` : null}</Typography.Text>
                  }
                  description={
                    <Col span={window.innerWidth > 1025 ? 10 : window.innerWidth < 425 ? 24 : 12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Tag color="volcano" className="TagSubject">{user.subject}</Tag>
                      <Tag color="geekblue" className="TagShift">{user.shift}</Tag>
                    </Col>
                  }
                />
              </List.Item>
            )}
          />
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

export default Users;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`