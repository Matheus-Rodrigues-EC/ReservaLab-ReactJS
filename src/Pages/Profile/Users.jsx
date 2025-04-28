import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Input, Select, Button, Typography, notification, Drawer, Popconfirm, List  } from "antd";
import { EditTwoTone, DeleteTwoTone, QuestionCircleOutlined  } from '@ant-design/icons'
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

  const getProfile = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/list/${id}`);
    setUserData(response.data)
  }

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/list/`);
      setUsers(response?.data);
      
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

  const editUser = async (id) => {
    localStorage.setItem("EditUser", id);
    Navigate(`/profile`);
  }

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/user/list/${id}`);
      console.log(response?.data);
      
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
          <List
            loading={loading}
            dataSource={users}
            className="ListUsers"
            renderItem={(user) => (
              <List.Item
                extra={
                  <>
                    <Button 
                      type="icon" 
                      style={{ fontSize: '1.25rem'}}
                      onClick={() => editUser(user?.id)}
                    >
                      <EditTwoTone twoToneColor="#FFA500" />
                    </Button>
                    <Popconfirm
                      title="Excluir usuário"
                      description="Tem certeza que deseja excluir o usuário?"
                      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      onConfirm={() => deleteUser(user?.id)}
                    >
                      <Button 
                        type="icon" 
                        style={{ fontSize: '1.25rem'}}
                      >
                        <DeleteTwoTone twoToneColor="#F00" />
                      </Button>
                    </Popconfirm>
                  </>
                }
              >
                <List.Item.Meta
                  title={`| ${user.name} | ${user?.surname || ''}`}
                  description={user.subject}
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