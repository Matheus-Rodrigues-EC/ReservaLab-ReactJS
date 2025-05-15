import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Input, Button, notification, Drawer, Popconfirm, List, Typography, Tag, message } from "antd";
import { EditTwoTone, DeleteTwoTone, QuestionCircleOutlined } from '@ant-design/icons'
import axios from "axios";
import styled from "styled-components";
import "./Style.less";

import SideMenu from "../../Components/SideMenu";
import TopMenu from "../../Components/TopMenu";

const Classrooms = () => {
  const [loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState();
  const [FilteredClasses, setFilteredClasses] = useState();
  const [classrooms, setClassrooms] = useState();
  const [Visible, setVisible] = useState(false);
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolder2] = message.useMessage();

  const goToClassroom = () => {
    Navigate('/classroom')
  }

  const getProfile = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/list/${id}`);
    setUserData(response.data)
  }

  const getClasses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/classroom/list/`);
      setClassrooms(response?.data);

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

  const filterClassrooms = (data) => {
    if (!classrooms || classrooms.length === 0) return classrooms;

    const filtered = classrooms.filter((classroom) => {
      const searchData = String(data).toLowerCase();
      const nameMatch = classroom?.name?.toLowerCase().includes(searchData);
      return nameMatch;
    });

    setFilteredClasses(filtered);
    return filtered;
  };

  const cancel = () => {
    messageApi.open({
      type: 'warning',
      content: 'Exclusão cancelada',
    });
  };

  const editClassroom = async (id) => {
    localStorage.setItem("EditClassroom", id);
    Navigate(`/classroom`);
  }

  const deleteClassroom = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/classroom/list/${id}`);

      api.success({
        message: 'Sala excluida com sucesso!',
        description: 'As informações da sala foram deletadas.',
        showProgress: true,
        duration: 2,
        placement: "top",
      });
      setTimeout(() => {
        getClasses();
        setLoading(false);
      }, 1750);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao excluir sala',
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
    getClasses();
    localStorage.removeItem("EditClassroom");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.id]);

  useEffect(() => {
    localStorage.removeItem("EditClassroom");
  }, [loading, classrooms]);

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
        <Typography.Title level={2} style={{ textAlign: 'center' }}>Salas</Typography.Title>
        <div className="ContainerClassrooms">
          <Row justify='space-between'>
            <Input.Search
              className="InputSearchClassrooms"
              placeholder="Filtre as salas"
              onSearch={filterClassrooms}
              loading={loading}
              allowClear
            />
            <Button
              className="CreateClassroomButton"
              onClick={() => goToClassroom()}
            >Cadastrar Sala</Button>
          </Row>
          <List
            loading={loading}
            dataSource={FilteredClasses || classrooms}
            className="ListClassroom"
            renderItem={(classroom) => (
              <List.Item
                extra={
                  (userData?.rulets === 'Diretor(a)' ||
                    userData?.rulets === 'Coordenador(a)') && (
                    <>
                      <Button
                        type="icon"
                        style={{ fontSize: '1.25rem' }}
                        onClick={() => editClassroom(classroom?.id)}
                      >
                        <EditTwoTone twoToneColor="#FFA500" />
                      </Button>
                      <Popconfirm
                        title="Excluir Sala"
                        description={
                          <>
                            <Typography.Text>
                              Tem certeza que deseja excluir a sala, todas as reservas ligadas a esta sala serão deletadas?
                            </Typography.Text>
                          </>
                        }
                        autoAdjustOverflow
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => deleteClassroom(classroom?.id)}
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
                  title={`${classroom.name}`}
                  description={
                    <>
                      <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography.Text type="secondary">
                          {`Esta sala tem capacidade para: ${classroom?.capacity} alunos`}
                        </Typography.Text>
                      </Col>
                      {classroom?.description && (
                        <>
                          <br />
                          <Col span={24}>
                            <Typography.Text type="secondary">
                              {classroom?.description}
                            </Typography.Text>
                          </Col>
                        </>
                      )}
                    </>
                  }
                  style={{ display: 'flex', flexDirection: 'row' }}
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

export default Classrooms;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`