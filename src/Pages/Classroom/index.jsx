import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography, notification } from "antd";
import axios from "axios";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";

import SideMenu from "../../Components/SideMenu";

const Classroom = () => {
  const data = Constants?.data;
  const Navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const goToHome = () => {
    Navigate('/home')
  }

  const createClassroom = async (data) => {
    const body = {
      ...data,
      capacity: Number(data.capacity)
    }
    const config = {
      headers: { Authorization: `Bearer ${userData.token}` },
    }
    setLoading(true)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/classroom/create`, body, config);

      api.success({
        message: 'Sala Cadastrada!',
        description: 'A sala cadastrada foi salva com sucesso.',
        showProgress: true,
        duration: 2,
        placement: "top"
      });

      setTimeout(() => {
        setLoading(false);
        goToHome();
      }, 2250);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao cadastrar sala',
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

  const onFinish = (values) => {
    console.log('Success:');
    console.table(values);
    createClassroom(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.table(errorInfo?.values);
  };


  useEffect(() => {

  }, [data]);

  return (

    <Container>
      {contextHolder}
      <Col span={4}>
        <SideMenu />
      </Col>
      <Col span={20}>
        <div className="ContainerClassroom">
          <Col span={10} style={{ display: 'flex', flexDirection: 'column', gap: '38px' }}>
            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Nome da Sala</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Tipo de Sala</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Capacidade da Sala</Typography.Title>
            </Row>

            <Row justify='space-between'>
              <Typography.Title level={4} style={{ margin: 0 }}>Descrição</Typography.Title>
            </Row>

            <Button
              type="danger"
              className="CancelClassroomButton"
              onClick={goToHome}
              loading={loading}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Col>
          <Col span={14} offset={2} style={{}}>
            <Form
              name="Create_Classroom"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                name='name'
                rules={[
                  { required: true, message: "Por favor, insira um nome para a sala" },
                ]}
                className="FormItemProfile"
              >

                <Input
                  size="large"
                  placeholder="Nome da Sala"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  type="text"
                />
              </Form.Item>

              <Form.Item
                name='classType'
                rules={[
                  { required: true, message: "Por favor selecione o tipo de sala." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  size="large"
                  placeholder="Tipo de sala"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                >
                  {Constants.classTypes.map((tipo) => (
                    <Select.Option key={tipo?.id} values={tipo?.id} >
                      {tipo?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='capacity'
                rules={[
                  { required: true, message: "Por favor selecione a capacidade da sala." },
                  { pattern: Constants.numberRegex, message: "Por favor, insira um valor válido!" },
                ]}
                className="FormItemProfile"
              >
                <Input
                  size="large"
                  placeholder="Capacidade da Sala"
                  style={{ width: '80%', height: 40 }}
                  allowClear
                  type="number"
                  min='10'
                  max='100'
                />
              </Form.Item>

              <Form.Item
                name='description'
                rules={[
                  { required: false, message: "Gostaria de adicionar alguma descrição?" }
                ]}
                className="FormItemProfile"
              >
                <Input.TextArea
                  showSearch
                  size="large"
                  placeholder="Gostaria de adicionar alguma descrição?"
                  style={{ width: '80%', heigh: '80px' }}
                  allowClear
                  showCount
                  maxLength={250}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="ClassroomButton"
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

export default Classroom;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`