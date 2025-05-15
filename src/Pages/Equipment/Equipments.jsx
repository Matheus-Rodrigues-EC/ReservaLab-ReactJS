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

const Equipments = () => {
  const [loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState();
  const [FilteredEquipments, setFilteredEquipments] = useState();
  const [equipments, setEquipments] = useState();
  const [Visible, setVisible] = useState(false);
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolder2] = message.useMessage();

  const goToEquipment = () => {
    Navigate('/equipment')
  }

  const getProfile = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/list/${id}`);
    setUserData(response.data)
  }

  const getEquipments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/equipments/list/`);
      setEquipments(response?.data);

      setLoading(false);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao carregar equipamentos',
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

  const filterEquipments = (data) => {
    if (!equipments || equipments.length === 0) return equipments;

    const filtered = equipments.filter((equipment) => {
      const searchData = String(data).toLowerCase();
      const nameMatch = equipment?.name?.toLowerCase().includes(searchData);
      return nameMatch;
    });

    setFilteredEquipments(filtered);
    return filtered;
  };

  const cancel = () => {
    messageApi.open({
      type: 'warning',
      content: 'Exclusão cancelada',
    });
  };

  const editEquipment = async (id) => {
    localStorage.setItem("editEquipment", id);
    Navigate(`/equipment`);
  }

  const deleteEquipment = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/equipments/list/${id}`);

      api.success({
        message: 'Equipamento excluido com sucesso!',
        description: 'As informações do equipamento foram deletadas.',
        showProgress: true,
        duration: 2,
        placement: "top",
      });
      setTimeout(() => {
        getEquipments();
        setLoading(false);
      }, 1750);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao excluir equipamento',
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
    getEquipments();
    localStorage.removeItem("editEquipment");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.id]);

  useEffect(() => {
    localStorage.removeItem("editEquipment");
  }, [loading, equipments]);

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
        <Typography.Title level={2} style={{ textAlign: 'center' }}>Equipamentos</Typography.Title>
        <div className="ContainerEquipments">
          <Row justify='space-between'>
            <Input.Search
              className="InputSearchEquipments"
              placeholder="Filtre os Equipamentos"
              onSearch={filterEquipments}
              loading={loading}
              allowClear
            />
            <Button
              className="CreateEquipmentButton"
              onClick={() => goToEquipment()}
            >Cadastrar Equipamento</Button>
          </Row>
          <List
            loading={loading}
            dataSource={FilteredEquipments || equipments}
            className="ListEquipments"
            renderItem={(equipment) => (
              <List.Item
                extra={
                  (userData?.rulets === 'Diretor(a)' ||
                    userData?.rulets === 'Coordenador(a)') && (
                    <>
                      <Button
                        type="icon"
                        style={{ fontSize: '1.25rem' }}
                        onClick={() => editEquipment(equipment?.id)}
                      >
                        <EditTwoTone twoToneColor="#FFA500" />
                      </Button>
                      <Popconfirm
                        title="Excluir Equipamento"
                        description={
                          <>
                            <Typography.Text>
                              Tem certeza que deseja excluir o equipamento, todas as reservas ligadas a este equipamento serão deletadas?
                            </Typography.Text>
                          </>
                        }
                        autoAdjustOverflow
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => deleteEquipment(equipment?.id)}
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
                  title={`${equipment.name}`}
                  description={
                    <>
                      <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography.Text type="secondary">
                          {equipment?.type} {equipment?.tombNumber}
                        </Typography.Text>
                      </Col>
                      {equipment?.description && (
                        <>
                          <br />
                          <Col span={24}>
                            <Typography.Text type="secondary">
                              {equipment?.description}
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

export default Equipments;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`