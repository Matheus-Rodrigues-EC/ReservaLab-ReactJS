import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography, DatePicker, notification } from "antd";
import axios from "axios";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";
import dayjs from "dayjs";

import {
  FuncionalidadesList as Finalidades,
} from "../../Utils/Constants";

import SideMenu from "../../Components/SideMenu";

const Reservation = () => {
  const [form] = Form.useForm();
  const [salas, setSalas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [initialTime, setInitialTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [filteredFinalidades, setFilteredFinalidades] = useState(Finalidades);
  const [api, contextHolder] = notification.useNotification();

  const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
  const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  const dateFormat = 'dddd, DD/MM/YYYY';
  // const timeFormat = 'HH:mm';
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleSearchFinalidades = (value) => {
    if (!value) {
      setFilteredFinalidades(Finalidades);
    } else {
      const filtered = Finalidades?.filter((finalidade) =>
        finalidade.value.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFinalidades(filtered);
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
    setTurmas(response.data);
  }

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    // console.log(dataCapitalizada)
  };

  const goToHome = () => {
    Navigate('/home')
  }

  const createReservation = async (data) => {
    
    // form.setFieldValue('time', `${initialTime} - ${endTime}`);
    const body = {
      ...data,
      date: dataCapitalizada,
      userId: Number(userData.id),
      classroomId: Number(data.classroomId),
      classId: Number(data.classId),
    }
    const config = {
      headers: { Authorization: `Bearer ${userData.token}` },
    }
    console.log('Body: ', body)

    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/reservations/create`, body, config);
      console.log(response?.data);
  
      api.success({
        message: 'Reserva Cadastrada!',
        description: 'A reserva foi registrada com sucesso.',
        showProgress: true,
        duration: 2,
        placement: "top"
      });
      setTimeout(() => {
        goToHome();
      }, 2250);
  
    } catch (error) {
      console.error(error);
  
      api.error({
        message: 'Erro ao cadastrar reserva',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.',
        showProgress: true,
        duration: 2,
        placement: "top"
      });
    }
  }

  const onFinish = (values) => {
    console.log('Success:');
    form.setFieldValue('time', `${initialTime} - ${endTime}`);
    console.log(values);
    createReservation(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:');
    console.table(errorInfo?.values);
    form.setFieldValue('time', `${initialTime} - ${endTime}`);
    console.log(`${initialTime} - ${endTime}`)
  };

  useEffect(() => {
    fetchSalas();
    fetchTurmas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              type="danger"
              className="CanceldButton"
              onClick={goToHome}
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
                  onChange={onChange}
                  // defaultValue={dayjs()}
                  format={dateFormat}
                  needConfirm
                  size="large"
                  placeholder={dataCapitalizada}
                  style={{ width: '80%', height: 40 }}
                  allowClear
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
                  size="large"
                  placeholder="Sala"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  onClick={() => fetchSalas()}
                >
                  {salas.map((sala) => (
                    <Select.Option key={sala?.id} values={sala?.id} >
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
                  size="large"
                  placeholder="Turma"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  onClick={() => fetchTurmas()}
                >
                  {turmas.map((turma) => (
                    <Select.Option key={turma?.id} values={turma?.id} >
                      {turma?.grade}º {turma?.className} - {turma?.shift}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Row justify='start' >
                <Form.Item
                  name='time'
                  rules={[
                    { required: true, message: "Por favor selecione um horário." }
                  ]}
                  className="FormItemTimeProfile"
                >
                  <Select
                    size="large"
                    placeholder="Horário"
                    style={{ width: '41%', height: 40 }}
                    prefix="De: "
                    allowClear
                    onClick={() => fetchTurmas()}
                    onChange={(value, option) => setInitialTime(option.children)}
                  >
                    {Constants.Times.map((time) => (
                      <Select.Option key={time?.label} values={time?.id} >
                        {time?.label}
                      </Select.Option>
                    ))}
                  </Select>
                  
                  <Select
                    size="large"
                    placeholder="Horário"
                    style={{ width: '41%', height: 40 }}
                    prefix="às: "
                    allowClear
                    onClick={() => fetchTurmas()}
                    onChange={(value, option) => setEndTime(option.children)}
                  >
                    {Constants.Times.map((time) => (
                      <Select.Option key={time?.id} value={time?.id}>
                        {time?.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* <Form.Item
                  name='timeEnd'
                  rules={[
                    { required: true, message: "Por favor selecione um horário." }
                  ]}
                  className="FormItemTimeProfile"
                >
                  <Select
                    size="large"
                    placeholder="Horário"
                    style={{ width: '95%', height: 40 }}
                    prefix="às: "
                    allowClear
                    onClick={() => fetchTurmas()}
                  >
                    {Constants.Times.map((time) => (
                      <Select.Option key={time?.label} values={time?.id} >
                        {time?.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item> */}
              </Row>

              <Form.Item
                name='purpose'
                rules={[
                  { required: true, message: "Por favor insira a finalidade que a sala terá." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  size="large"
                  placeholder="Finalidade"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  onSearch={handleSearchFinalidades}
                  filterOption={false}
                >
                  {filteredFinalidades.map((finalidade) => (
                    <Select.Option key={finalidade?.id} values={finalidade?.id} >
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
                <Input
                  size="large"
                  placeholder="Gostaria de adicionar alguma descrição?"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  type="textarea"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="SaveReservationButton"
                onClick={() => form.setFieldValue('time', `${initialTime} - ${endTime}`)}
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