import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Button, Typography, notification, Drawer } from "antd";
import axios from "axios";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";

import SideMenu from "../../Components/SideMenu";
import TopMenu from "../../Components/TopMenu";

const Classroom = () => {
  const data = Constants?.data;
  const Navigate = useNavigate()
  const [Visible, setVisible] = useState(false);
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
    setLoading(true)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/classroom/create`, body);

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
    // console.log('Success:');
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
        <div className="ContainerClassroom">
          <Col span={10} style={{ display: 'flex', flexDirection: 'column', gap: '38px' }}>
            <Row justify='space-between'>
              <Typography.Text className="TextClassroom">Nome da Sala</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextClassroom">Capacidade da Sala</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextClassroom">Descrição</Typography.Text>
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
          <Col span={12} offset={2}>
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
                  className="InputClassroom"
                  allowClear
                  type="text"
                />
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
                  className="InputClassroom"
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
                  size="large"
                  placeholder="Gostaria de adicionar alguma descrição?"
                  className="inputTextAreaClassroom"
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

export default Classroom;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`