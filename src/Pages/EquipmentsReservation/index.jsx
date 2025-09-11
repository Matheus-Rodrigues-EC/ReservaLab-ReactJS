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
import Loading from "../../Components/Loading";

const EquipmentsReservation = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [Times, setTimes] = useState(Integral);
  // const [filteredFinalidades, setFilteredFinalidades] = useState(Finalidades);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState(equipments);
  const [Visible, setVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
  const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  const dateFormat = 'dddd, DD/MM/YYYY';
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));
  const editEquipmentReservationId = sessionStorage.getItem("editEquipmentReservationId");

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

  const getAllowedTimes = (base) => {
    const index = Times.indexOf(base);
    const range = userData?.subject === 'Polivalente' ? 3 : 1;

    const allowed = [];
    for (let i = -range; i <= range; i++) {
      const time = Times[index + i];
      if (time) allowed.push(time);
    }
    return allowed;
  };

  const handleChange = (values) => {
    if (values.length === 0) {
      setSelectedTimes([]);
      return;
    }

    const base = values[0];
    const allowed = getAllowedTimes(base);
    const filtered = values.filter((v) => allowed.includes(v));
    setSelectedTimes(filtered);
  };

  const allowedSet = new Set(
    selectedTimes.length > 0 ? getAllowedTimes(selectedTimes[0]) : Times
  );

  const validateTimes = (userData, Times) => (_, value) => {
    const max = userData?.subject === "Polivalente" ? 4 : 2;

    if (!value || value.length === 0) {
      return Promise.reject(new Error("Selecione ao menos um horário"));
    }

    if (value.length > max) {
      return Promise.reject(
        new Error(`Você pode selecionar no máximo ${max} horário(s).`)
      );
    }

    const selectedIndexes = value
      .map((val) => Times.findIndex((t) => t.label === val))
      .sort((a, b) => a - b);

    const isSequential = selectedIndexes.every((val, i, arr) => {
      return i === 0 || val === arr[i - 1] + 1;
    });

    if (!isSequential) {
      return Promise.reject(
        new Error("Selecione horários em sequência.")
      );
    }

    return Promise.resolve();
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

  const getEditEquipmentReservation = async (id) => {
    setLoading(true);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/equipments-reservations/list/${id}`);
    form.setFieldsValue({
      date: dayjs(response?.data?.date),
      equipmentId: response?.data?.equipmentId,
      time: response?.data?.time,
      description: response?.data?.description,
    });
    setSelectedTimes(response?.data?.time || []);
    console.log(response?.data);
    setLoading(false);
  };

  const updateEquipmentReservation = async (data) => {
    const body = {
      ...data,
      userId: Number(userData.id),
    }
    setLoading(true);
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/equipments-reservations/${data.id}/update`, body);
      api.success({
        message: 'Reserva de Equipamento Atualizada!',
        description: 'A reserva de equipamento foi atualizada com sucesso.',
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
        message: 'Erro ao atualizar reserva de equipamento',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.',
        showProgress: true,
        duration: 3,
        placement: "top"
      });
      setTimeout(() => {
        setLoading(false);
      }, 2750);
    }
  };

  const onFinish = (values) => {
    const dataCapitalizada = dayjs(values.date).startOf('day').toDate();
    editEquipmentReservationId
      ? updateEquipmentReservation({ id: editEquipmentReservationId, ...values, date: dataCapitalizada })
      : createEquipmentReservation({ ...values, date: dataCapitalizada });
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
    // errorInfo?.errorFields?.map((error) => {
    //   console.error(error?.errors[0])
    // })
    api.warning({
      message: 'Campos obrigatórios faltando',
      description: 'Por favor, revise os campos do formulário e tente novamente.',
      placement: 'top',
    });
  };

  useEffect(() => {
    if (editEquipmentReservationId) {
      getEditEquipmentReservation(editEquipmentReservationId);
    }
    fetchEquipments();
    handleSearchEquipments('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  }, []);

  return (

    <Container>
      {contextHolder}
      {loading && <Loading />}
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
        <Typography.Title level={2} style={{ textAlign: 'center' }}>Reservar Equipamentos</Typography.Title>
        <div className="ContainerEquipmentReservation">
          <Col span={24} style={{}}>
            <Form
              form={form}
              layout="vertical"
              name="EquipmentReservation"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                label="Data"
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
                  style={{ width: '100%' }}
                  allowClear
                  disabledDate={disabledDate}
                />
              </Form.Item>

              <Form.Item
                label="Equipamento"
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
                  label="Horário"
                  name="time"
                  rules={[
                    {
                      required: true,
                      message:
                        userData?.subject === "Polivalente"
                          ? "Por favor selecione até quatro horários."
                          : "Por favor selecione até dois horários.",
                    },
                    {
                      validator: validateTimes(userData, Times),
                    },
                  ]}
                  className="FormItemReservation"
                >
                  <Select
                    size="large"
                    placeholder={
                      userData?.subject === "Polivalente"
                        ? "Selecione até quatro horários"
                        : "Selecione até dois horários"
                    }
                    disabled={loading}
                    className="InputReservation"
                    allowClear
                    value={selectedTimes}
                    onClear={() => {
                      form.setFieldValue("time", []);
                      setTimes(Integral); // reset para default
                    }}
                    onChange={handleChange}
                    mode="multiple"
                    maxCount={userData?.subject === "Polivalente" ? 4 : 2}
                  >
                    {Times.map((time) => (
                      <Select.Option
                        key={time?.label}
                        value={time?.label}
                        disabled={!allowedSet?.has(time)}
                      >
                        {time?.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Row>

              <Form.Item
                label="Descrição (opcional)"
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

              <Row justify="space-between">

                <Button
                  className="CanceldButtonEquipmentReservation"
                  onClick={goToHome}
                  loading={loading}
                  disabled={loading}
                >
                  Cancelar
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="SaveButtonEquipmentReservation"
                  loading={loading}
                  disabled={loading}
                >
                  {editEquipmentReservationId ? 'Atualizar Reserva' : 'Salvar Reserva'}
                </Button>
              </Row>

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