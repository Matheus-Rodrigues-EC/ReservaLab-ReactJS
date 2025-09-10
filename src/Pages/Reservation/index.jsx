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
  FuncionalidadesList as Finalidades,
  Fundamental_Morning_Times,
  Fundamental_Afternoom_Times,
  Fundamental_Integral_Times,
  EJA_Times,
  removerAcentos,
} from "../../Utils/Constants";

import SideMenu from "../../Components/SideMenu";
import TopMenu from "../../Components/TopMenu";
import Loading from "../../Components/Loading";

const Reservation = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [Times, setTimes] = useState(Fundamental_Integral_Times);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [salas, setSalas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [filteredFinalidades, setFilteredFinalidades] = useState(Finalidades);
  const [filteredClasses, setFilteredClasses] = useState(turmas);
  const [filteredSalas, setFilteredSalas] = useState(salas);
  const [Visible, setVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
  const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  const dateFormat = 'dddd, DD/MM/YYYY';
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData')) || {};

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
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/classroom/list`);
    setSalas(response.data);
    setFilteredSalas(response.data);
  }

  const fetchTurmas = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/classes/list`);
    setTurmas(response.data);
    setFilteredClasses(response.data);
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


  const createReservation = async (data) => {
    const body = {
      ...data,
      userId: Number(userData.id),
      classroomId: Number(data.classroomId),
      classId: Number(data.classId),
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reservations/create`, body);

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

  const onFinishFailed = () => {
    console.error('Failed:');
    // console.table(errorInfo?.values);
    api.warning({
      message: 'Campos obrigatórios faltando',
      description: 'Por favor, revise os campos do formulário e tente novamente.',
      placement: 'top',
    });
  };

  useEffect(() => {
    fetchSalas();
    fetchTurmas();
    handleSearchClasses('');
    handleSearchSalas('');
    if (!userData) {
      Navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [form]);

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
        <Typography.Title level={2} style={{ textAlign: 'center' }}>Reservar Sala</Typography.Title>
        <div className="ContainerReservation">
          {/* <Col span={10} style={{ display: 'flex', flexDirection: 'column', gap: '38px' }}>
            <Row justify='space-between'>
              <Typography.Text className="TextReservation" >Selecione a data</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextReservation" >Selecione a sala</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextReservation" >Selecione a turma</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextReservation" >Selecione o  horário</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextReservation" >Finalidade</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextReservation" >Descrição</Typography.Text>
            </Row>
          </Col> */}

          <Col span={24} style={{}}>
            <Form
              form={form}
              layout="vertical"
              name="Reservation"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
              disabled={loading}
            >
              <Form.Item
                label="Data"
                name='date'
                rules={[
                  { required: true, message: "Por favor, selecione a data desejada" },
                ]}
                className="FormItemReservation"
              >
                <DatePicker
                  format={dateFormat}
                  needConfirm
                  size="large"
                  placeholder={dataCapitalizada}
                  disabled={loading}
                  className="InputDateReservation"
                  style={{ width: '100%' }}
                  allowClear
                  disabledDate={disabledDate}
                />
              </Form.Item>

              <Form.Item
                label="Sala"
                name='classroomId'
                rules={[
                  { required: true, message: "Por favor selecione uma sala." }
                ]}
                className="FormItemReservation"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Sala"
                  disabled={loading}
                  filterOption={false}
                  className="InputReservation"
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
                label="Turma"
                name='classId'
                rules={[
                  { required: true, message: "Por favor selecione uma Turma." }
                ]}
                className="FormItemReservation"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Turma"
                  disabled={loading}
                  filterOption={false}
                  className="InputReservation"
                  allowClear
                  onChange={(value) => { changeTimes(value); form.setFieldValue('time', []) }}
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
                      setTimes(Fundamental_Integral_Times); // reset para default
                    }}
                    onChange={handleChange}
                    mode="multiple"
                    maxCount={userData?.subject === "Polivalente" ? 4 : 2}
                  >
                    {Times.map((time) => (
                      <Select.Option
                        key={time.label}
                        value={time.label}
                        disabled={!allowedSet.has(time)}
                      >
                        {time.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Row>

              <Form.Item
                label="Finalidade"
                name='purpose'
                rules={[
                  { required: true, message: "Por favor insira a finalidade da reserva." }
                ]}
                className="FormItemReservation"
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Finalidade"
                  disabled={loading}
                  className="InputReservation"
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
                label="Descrição (opcional)"
                name='description'
                rules={[
                  { required: false, message: "Gostaria de adicionar alguma descrição?" }
                ]}
                className="FormItemReservation"
              >
                <Input.TextArea
                  size="large"
                  placeholder="Gostaria de adicionar alguma descrição?"
                  disabled={loading}
                  className="inputTextAreaReservation"
                  allowClear
                  showCount
                  maxLength={250}
                />
              </Form.Item>

              <Row justify='end' style={{ marginTop: '1.5rem', gap: '1rem' }}>
                <Button
                  className="CanceldButtonReservation"
                  onClick={goToHome}
                  loading={loading}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="SaveButtonReservation"
                  loading={loading}
                  disabled={loading}
                >
                  Criar Reserva
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

export default Reservation;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`