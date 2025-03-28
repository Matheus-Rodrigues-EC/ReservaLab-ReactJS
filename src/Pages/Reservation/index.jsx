import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography, DatePicker, TimePicker } from "antd";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";
import dayjs from "dayjs";

import {
  FuncionalidadesList as Finalidades,
} from "../../Utils/Constants";

import SideMenu from "../../Components/SideMenu";

const Reservation = () => {
  const [salas, setSalas] = useState([]);
  const [filteredFinalidades, setFilteredFinalidades] = useState(Finalidades);
  // const [filteredDisciplinas, setFilteredDisciplinas] = useState(Disciplinas);
  const data = Constants?.data;
  const Navigate = useNavigate()

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

  const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
  const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    // console.log(dataCapitalizada)
  };

  const dateFormat = 'dddd, DD/MM/YYYY';
  const timeFormat = 'HH:mm';

  // const handleSearchDisciplinas = (value) => {
  //   if (!value) {
  //     setFilteredDisciplinas(Disciplinas);
  //   } else {
  //     const filtered = Disciplinas?.filter((disciplina) =>
  //       disciplina.value.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setFilteredDisciplinas(filtered);
  //   }
  // };

  const goToHome = () => {
    Navigate('/home')
  }

  const onFinish = (values) => {
    console.log('Success:');
    console.table(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.table(errorInfo?.values);
  };

  useEffect(() => {
    setSalas([]);
  }, [data]);

  return (

    <Container>
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
              name="Reservation"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                name='Select_Date'
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
                name='Sala'
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
                >
                  {salas.map((sala) => (
                    <Select.Option key={sala} values={sala} >
                      {sala}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='Horário'
                rules={[
                  { required: true, message: "Por favor selecione um horário." }
                ]}
                className="FormItemProfile"
              >
                <TimePicker
                  format={timeFormat}
                  needConfirm
                  size="large"
                  placeholder="Horário"
                  style={{ width: '80%', height: 40 }}
                />
              </Form.Item>

              <Form.Item
                name='Finalidade'
                rules={[
                  { required: true, message: "Por favor insira a finalidade que a sala terá." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  showSearch
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
                name='Descrição'
                rules={[
                  { required: false, message: "Gostaria de adicionar alguma descrição?" }
                ]}
                className="FormItemProfile"
              >
                <Input
                  showSearch
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
                className="SaveButton"
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