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

const Classes = () => {
  const [loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState();
  const [FilteredClasses, setFilteredClasses] = useState();
  const [classes, setClasses] = useState();
  const [Visible, setVisible] = useState(false);
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolder2] = message.useMessage();

  const goToClass = () => {
    Navigate('/class')
  }

  const getProfile = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/list/${id}`);
    setUserData(response.data)
  }

  const getClasses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/classes/list/`);
      setClasses(response?.data);

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

  const filterClasses = (data) => {
    if (!classes || classes.length === 0) return classes;

    const filtered = classes.filter((classe) => {
      const searchData = String(data).toLowerCase();

      const gradeMatch = classe?.grade === Number(data);
      const classNameMatch = classe?.className?.toLowerCase().includes(searchData);
      const shiftMatch = classe?.shift?.toLowerCase().includes(searchData);

      return gradeMatch || classNameMatch || shiftMatch;
    });

    setFilteredClasses(filtered);
    return filtered;
  };

  const cancel = () => {
    messageApi.open({
      type: 'error',
      content: 'Exclusão cancelada',
    });
  };

  const editClass = async (id) => {
    localStorage.setItem("EditClass", id);
    Navigate(`/class`);
  }

  const deleteClass = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/classes/list/${id}`);

      api.success({
        message: 'Turma excluida com sucesso!',
        description: 'As informações da turma foram deletadas.',
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
        message: 'Erro ao excluir turma',
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
    localStorage.removeItem("EditClass");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.id]);

  useEffect(() => {
    localStorage.removeItem("EditClass");
  }, [loading, classes]);

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
      <Col span={window.innerWidth < 1025 ? 24 : 20} style={window.innerWidth < 1025 ? { marginTop: '10vh' } : { marginTop: '1vh' }}>
        <div className="ContainerClasses">
          <Row justify='space-between'>
            <Input.Search
              className="InputSearchClasses"
              placeholder="Filtre as turmas"
              onSearch={filterClasses}
              loading={loading}
              allowClear
            />
            <Button
              className="CreateClassButton"
              onClick={() => goToClass()}
            >Cadastrar turma</Button>
          </Row>
          <List
            loading={loading}
            dataSource={FilteredClasses || classes}
            className="ListClasses"
            renderItem={(classe) => (
              <List.Item
                extra={
                  <>
                    <Button
                      type="icon"
                      style={{ fontSize: '1.25rem' }}
                      onClick={() => editClass(classe?.id)}
                    >
                      <EditTwoTone twoToneColor="#FFA500" />
                    </Button>
                    <Popconfirm
                      title="Excluir Turma"
                      description={
                        <>
                          <Typography.Text>
                            Tem certeza que deseja excluir a turma, todas as reservas
                          </Typography.Text>
                          <br />
                          <Typography.Text>
                            ligadas a esta turma serão deletadas?
                          </Typography.Text>
                        </>
                      }
                      autoAdjustOverflow
                      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      onConfirm={() => deleteClass(classe?.id)}
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
                }
              >
                <List.Item.Meta
                  title={`${classe.grade}º ${classe?.className}`}
                  description={
                    <>
                      <Col span={8} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Tag color={
                          classe?.shift === 'Manhã' ? 'green' :
                            classe?.shift === 'Tarde' ? 'orange' :
                              classe?.shift === 'Integral' ? 'volcano' :
                                'blue'}
                          style={{ fontSize: '1rem' }}
                        >
                          {classe?.shift}
                        </Tag>
                      </Col>

                      {classe?.description && (
                        <>
                          <br />
                          <Col span={24}>
                            <Typography.Text type="secondary">
                              {classe?.description}
                            </Typography.Text>
                          </Col>
                        </>
                      )}
                    </>
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

export default Classes;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`