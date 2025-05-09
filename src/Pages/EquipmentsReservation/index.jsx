import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography, DatePicker, notification, Drawer } from "antd";
import axios from "axios";
import styled from "styled-components";
import "./Style.less";
import dayjs from "dayjs";

import {
  Fundamental_Integral_Times as Integral,
} from "../../Utils/Constants";

import SideMenu from "../../Components/SideMenu";
import TopMenu from "../../Components/TopMenu";

const EquipmentsReservation = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState([]);
  // const [filteredFinalidades, setFilteredFinalidades] = useState(Finalidades);
  const [filteredEquipments, setFilteredEquipments] = useState(equipments);
  const [Visible, setVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
  const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  const dateFormat = 'dddd, DD/MM/YYYY';
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleSearchEquipments = (value) => {
    if (!value) {
      setFilteredEquipments(equipments);
    } else {
      const filtered = equipments?.filter((equipment) =>
        equipment?.name?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setFilteredEquipments(filtered);
    }
  };

  // const handleSearchFinalidades = (value) => {
  //   if (!value) {
  //     setFilteredFinalidades(Finalidades);
  //   } else {
  //     const filtered = Finalidades?.filter((finalidade) =>
  //       finalidade.label.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setFilteredFinalidades(filtered);
  //   }
  // };

  const fetchEquipments = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/equipments/list`);
    setEquipments(response.data);
  }

  const goToHome = () => {
    Navigate('/home')
  }

  const disabledDate = (current) => {
    return current && (current < dayjs().startOf('day') || current.day() === 0 || current.day() === 6);
  };

  const createEquipmentReservation = async (data) => {
    const body = {
      ...data,
      userId: Number(userData.id),
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/equipments-reservations/create`, body);

      api.success({
        message: 'Reserva de Equipamento Cadastrada!',
        description: 'A reserva de equipamento foi registrada com sucesso.',
        showProgress: true,
        duration: 2,
        placement: "top"
      });
      setTimeout(() => {
        setLoading(false);
        goToHome();
      }, 2250);
    } catch (error) {
      console.error("Erro:", error?.response?.data?.message || error?.message || error);
      api.error({
        message: 'Erro ao cadastrar reserva de equipamento',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.',
        showProgress: true,
        duration: 3,
        placement: "top"
      });
      setTimeout(() => {
        setLoading(false);
      }, 2750);
    }
  }

  const onFinish = (values) => {
    const dataCapitalizada = dayjs(values.date).startOf('day').toDate();
    createEquipmentReservation({ ...values, date: dataCapitalizada });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:');
    console.table(errorInfo?.values);
  };

  useEffect(() => {
    fetchEquipments();
    handleSearchEquipments('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  }, []);

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
      <Col span={window.innerWidth < 1025 ? 24 : 20} style={window.innerWidth < 1025 ? { marginTop: '5vh' } : { marginTop: '1vh' }}>
      <Typography.Title level={2} style={{ textAlign: 'center'}}>Reservar Equipamentos</Typography.Title>
        <div className="ContainerEquipmentReservation">
          <Col span={10} style={{ display: 'flex', flexDirection: 'column', gap: '38px' }}>
            <Row justify='space-between'>
              <Typography.Text className="TextEquipmentReservation" >Selecione a data</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextEquipmentReservation" >Selecione o equipamento</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextEquipmentReservation" >Selecione o  horário</Typography.Text>
            </Row>

            {/* <Row justify='space-between'>
              <Typography.Text className="TextEquipmentReservation" >Finalidade</Typography.Text>
            </Row> */}

            <Row justify='space-between'>
              <Typography.Text className="TextEquipmentReservation" >Descrição</Typography.Text>
            </Row>

            <Button
              className="CanceldButtonEquipmentReservation"
              onClick={goToHome}
              loading={loading}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Col>

          <Col span={12} offset={2} style={{}}>
            <Form
              form={form}
              name="EquipmentReservation"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                name='date'
                rules={[
                  { required: true, message: "Por favor, selecione a data desejada" },
                ]}
                className="FormItemProfile"
              >
                <DatePicker
                  format={dateFormat}
                  needConfirm
                  size="large"
                  placeholder={dataCapitalizada}
                  disabled={loading}
                  className="InputDateEquipmentReservation"
                  style={{ width: '100%'}}
                  allowClear
                  disabledDate={disabledDate}
                />
              </Form.Item>

              <Form.Item
                name='equipmentId'
                rules={[
                  { required: true, message: "Por favor selecione um equipamento." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Equipamento"
                  disabled={loading}
                  filterOption={false}
                  className="InputEquipmentReservation"
                  allowClear
                  // onClick={() => fetchSalas()}
                  onSearch={handleSearchEquipments}
                >
                  {(filteredEquipments.length > 0 ? filteredEquipments : equipments).map((equipment) => (
                    <Select.Option key={equipment?.id} value={equipment?.id} >
                      {equipment?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Row justify='space-between' >
                <Form.Item
                  name='time'
                  rules={[
                    { required: true, message: "Por favor selecione um horário." }
                  ]}
                  className="FormItemProfile"
                >
                  <Select
                    size="large"
                    placeholder="Selecione um ou dois horários "
                    disabled={loading}
                    className="InputEquipmentReservation"
                    allowClear
                    onClick={() => null}
                    mode="multiple"
                    maxCount={2}
                  >
                    {Integral?.map((time) => (
                      <Select.Option key={time.label} value={time.label}>
                        {time.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Row>

              {/* <Form.Item
                name='purpose'
                rules={[
                  { required: true, message: "Por favor insira a finalidade que a sala terá." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Finalidade"
                  disabled={loading}
                  className="InputEquipmentReservation"
                  allowClear
                  onSearch={handleSearchFinalidades}
                  filterOption={false}
                >
                  {filteredFinalidades.map((finalidade) => (
                    <Select.Option key={finalidade?.id} value={finalidade?.id} >
                      {finalidade?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item> */}

              <Form.Item
                name='description'
                rules={[
                  { required: false, message: "Gostaria de adicionar alguma descrição?" }
                ]}
                className="FormItemProfile"
              >
                <Input.TextArea
                  size="large"
                  placeholder="Gostaria de adicionar alguma descrição?"
                  disabled={loading}
                  className="inputTextAreaEquipmentReservation"
                  allowClear
                  showCount
                  maxLength={250}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="SaveButtonEquipmentReservation"
                loading={loading}
                disabled={loading}
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

export default EquipmentsReservation;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`