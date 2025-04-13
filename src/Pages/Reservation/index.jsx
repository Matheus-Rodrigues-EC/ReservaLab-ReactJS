import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography, DatePicker, notification } from "antd";
import axios from "axios";
import styled from "styled-components";
import "./Style.less";
import dayjs from "dayjs";

import {
  FuncionalidadesList as Finalidades,
  Fundamental_Morning_Times,
  Fundamental_Afternoom_Times,
  Fundamental_Integral_Times,
  EJA_Times,
  removerAcentos,
} from "../../Utils/Constants";

import SideMenu from "../../Components/SideMenu";

const Reservation = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [Times, setTimes] = useState(Fundamental_Integral_Times);
  const [salas, setSalas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [filteredFinalidades, setFilteredFinalidades] = useState(Finalidades);
  const [filteredClasses, setFilteredClasses] = useState(turmas);
  const [filteredSalas, setFilteredSalas] = useState(salas);
  const [api, contextHolder] = notification.useNotification();

  const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
  const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  const dateFormat = 'dddd, DD/MM/YYYY';
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleSearchSalas = (value) => {
    if (!value) {
      setFilteredSalas(salas);
    } else {
      const filtered = salas?.filter((sala) =>
        sala?.name?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setFilteredSalas(filtered);
    }
  };

  const handleSearchFinalidades = (value) => {
    if (!value) {
      setFilteredFinalidades(Finalidades);
    } else {
      const filtered = Finalidades?.filter((finalidade) =>
        finalidade.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFinalidades(filtered);
    }
  };

  const handleSearchClasses = (value) => {
    if (!value) {
      setFilteredClasses(turmas);
    } else {
      const filtered = turmas?.filter((turma) => {
        const classe = `${turma?.grade || ""}º ${turma?.className || ""} - ${turma?.shift || ""}`;
        return removerAcentos(classe.toLowerCase()).includes(removerAcentos(value.toLowerCase()));
      });
      setFilteredClasses(filtered);
    }
  };

  const fetchSalas = async () => {
    const config = {
      headers: { Authorization: `Bearer ${userData.token}` },
    }
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/classroom/list`, config);
    setSalas(response.data);
  }

  const fetchTurmas = async () => {
    const config = {
      headers: { Authorization: `Bearer ${userData.token}` },
    }
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/classes/list`, config);
    setTurmas(response?.data);
  }

  const goToHome = () => {
    Navigate('/home')
  }

  const disabledDate = (current) => {
    return current && (current < dayjs().startOf('day') || current.day() === 0 || current.day() === 6);
  };

  const shiftTimeMap = {
    'Manhã': Fundamental_Morning_Times,
    'Tarde': Fundamental_Afternoom_Times,
    'Noite': EJA_Times,
  };
  
  const changeTimes = (id) => {
    const classe = turmas.find((turma) => turma?.id == id);
    const times = shiftTimeMap[classe?.shift] || Fundamental_Integral_Times;
    setTimes(times);
  };

  const createReservation = async (data) => {
    const body = {
      ...data,
      userId: Number(userData.id),
      classroomId: Number(data.classroomId),
      classId: Number(data.classId),
    }
    const config = {
      headers: { Authorization: `Bearer ${userData.token}` },
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reservations/create`, body, config);

      api.success({
        message: 'Reserva Cadastrada!',
        description: 'A reserva foi registrada com sucesso.',
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
        message: 'Erro ao cadastrar reserva',
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
    createReservation({ ...values, purpose: String(values.purpose), date: dataCapitalizada });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:');
    console.table(errorInfo?.values);
  };

  useEffect(() => {
    fetchSalas();
    fetchTurmas();
    handleSearchClasses('');
    handleSearchSalas('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  }, []);

  return (

    <Container>
      {contextHolder}
      <Col span={4}>
        <SideMenu />
      </Col>
      <Col span={20}>
        <div className="ContainerReservation">
          <Col span={10} style={{ display: 'flex', flexDirection: 'column', gap: '38px' }}>
            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Selecione a data</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Selecione a sala</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Selecione a turma</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Selecione o  horário</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Finalidade</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Descrição</Typography.Title>
            </Row>

            <Button
              className="CanceldButtonReservation"
              onClick={goToHome}
              loading={loading}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Col>

          <Col span={14} offset={2} style={{}}>
            <Form
              form={form}
              name="Reservation"
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
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  disabledDate={disabledDate}
                />
              </Form.Item>

              <Form.Item
                name='classroomId'
                rules={[
                  { required: true, message: "Por favor selecione uma sala." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Sala"
                  disabled={loading}
                  filterOption={false}
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  // onClick={() => fetchSalas()}
                  onSearch={handleSearchSalas}
                >
                  {(filteredSalas.length > 0 ? filteredSalas : salas).map((sala) => (
                    <Select.Option key={sala?.id} value={sala?.id} >
                      {sala?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='classId'
                rules={[
                  { required: true, message: "Por favor selecione uma Turma." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Turma"
                  disabled={loading}
                  filterOption={false}
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  onChange={(value) => {changeTimes(value); form.setFieldValue('time', [])}}
                  onSearch={handleSearchClasses}
                >
                  {(filteredClasses.length > 0 ? filteredClasses : turmas).map((turma) => (
                    <Select.Option key={turma?.id} value={turma?.id} >
                      {turma?.grade}º {turma?.className} - {turma?.shift}
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
                    style={{ width: '80%', height: 40 }}
                    allowClear
                    onClick={() => null}
                    mode="multiple"
                    maxCount={2}
                  >
                    {Times?.map((time) => (
                      <Select.Option key={time.label} value={time.label}>
                        {time.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Row>

              <Form.Item
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
                  style={{ width: '80%', height: 40 }}
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
              </Form.Item>

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
                  style={{ width: '80%', heigh: '80px' }}
                  allowClear
                  showCount
                  maxLength={250}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="SaveButtonReservation"
                loading={loading}
                disabled={loading}
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

export default Reservation;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`