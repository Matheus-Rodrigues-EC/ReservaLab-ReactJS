import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Col, Row, Form, Input, Select, Button, Typography, notification, Drawer } from "antd";
import axios from "axios";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";

import {
  EquipamentsTypes,
} from "../../Utils/Constants";

import SideMenu from "../../Components/SideMenu";
import TopMenu from "../../Components/TopMenu";

const Equipment = () => {
  const [form] = Form.useForm();
  const data = Constants?.data;
  const Navigate = useNavigate()
  const [Visible, setVisible] = useState(false);
  const [EquipmentData, setEquipmentData] = useState();
  const editEquipment = JSON.parse(localStorage.getItem('editEquipment'));
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const goToEquipments = () => {
    Navigate('/equipments')
  }

  const createEquipment = async (data) => {
    
    setLoading(true);
    const body = {
      ...data,
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/equipments/create`, body);

      api.success({
        message: 'Equipamento Cadastrado!',
        description: 'O equipamento cadastrado foi salvo com sucesso.',
        showProgress: true,
        duration: 2,
        placement: "top"
      });

      setTimeout(() => {
        setLoading(false);
        goToEquipments();
      }, 2250);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao cadastrar equipamento',
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

  const updateEquipment = async () => {
    const body = {
      name: form.getFieldValue('name'),
      type: form.getFieldValue('type'),
      tombNumber: form.getFieldValue('tombNumber'),
      description: form.getFieldValue('description'),
    };
  
    try {
      setLoading(true);
  
      await axios.patch(`${import.meta.env.VITE_API_URL}/equipments/${editEquipment}/update`, body);
  
      api.success({
        message: 'Equipamento Atualizado!',
        description: 'As informações do equipamento foram atualizadas com sucesso.',
        showProgress: true,
        duration: 2,
        placement: 'top',
      });
  
      setTimeout(() => {
        setLoading(false);
        goToEquipments();
      }, 2250);
  
    } catch (error) {
      console.error(error);
  
      api.error({
        message: 'Erro ao atualizar equipamento',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.',
        showProgress: true,
        duration: 2,
        placement: 'top',
      });
  
      setTimeout(() => {
        setLoading(false);
      }, 1750);
    }
  };
  

  const getEquipment = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/equipments/list/${id}`);
    setEquipmentData(response?.data)
  }

  const onFinish = (values) => {
    if (editEquipment) {
      updateEquipment(values);
      console.log(Number(EquipmentData.grade));
      console.log('update')
    } else {
      createEquipment(values);
      console.log('create')
    }
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
    if(editEquipment)
      getEquipment(editEquipment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (EquipmentData) {
      form.setFieldsValue({
        name: EquipmentData.name,
        type: EquipmentData.type,
        tombNumber: EquipmentData.tombNumber,
        description: EquipmentData.description,
      });
    }
  }, [EquipmentData, form, data]);

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
            <Typography.Title 
              level={2} 
              style={{ textAlign: 'center'}}
            >
              {editEquipment ? 'Atualizar Equipamento' : 'Cadastrar Equipamento'}
            </Typography.Title>
        <div className="ContainerEquipment">
          <Col span={10} style={{ display: 'flex', flexDirection: 'column', gap: '38px' }}>
            <Row justify='space-between'>
              <Typography.Text className="TextEquipment">Nome</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextEquipment">Tipo</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextEquipment">Nº de Tombamento</Typography.Text>
            </Row>

            <Row justify='space-between'>
              <Typography.Text className="TextEquipment">Obervação</Typography.Text>
            </Row>

            <Button
              type="danger"
              className="CanceldButtonEquipment"
              onClick={goToEquipments}
              loading={loading}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Col>
          <Col span={12} offset={1}>
            <Form
              form={form}
              name="Equipment"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                name='name'
                initialValue={EquipmentData?.name || null}
                rules={[
                  { required: true, message: "Por favor, insira o nome do equipamento." },
                ]}
                className="FormItemEquipment"
              >

                <Input
                  size="large"
                  placeholder="Nome"
                  className="InputEquipment"
                  allowClear
                  loading={loading}
                  disabled={loading}
                />
              </Form.Item>

              <Form.Item
                name='type'
                initialValue={EquipmentData?.type || null}
                rules={[
                  { required: true, message: "Por favor selecione o tipo de equipamento." }
                ]}
                className="FormItemEquipment"
              >
                <Select
                  size="large"
                  placeholder="Tipo"
                  className="InputEquipment"
                  allowClear
                  loading={loading}
                  disabled={loading}
                >
                  {EquipamentsTypes.map((equipment) => (
                    <Select.Option key={equipment?.label} values={equipment?.label} >
                      {equipment?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='tombNumber'
                initialValue={EquipmentData?.tombNumber || null}
                rules={[
                  { required: false, message: "Por favor insira um número de tombamento." },
                  { pattern: Constants.tombRegex, message: "Por favor, insira um número de tomabento válido! Exemplo: (595-T-1959)" },
                ]}
                className="FormItemEquipment"
              >
                <Input
                  size="large"
                  placeholder="Número de Tombamento"
                  className="InputEquipment"
                  allowClear
                  loading={loading}
                  disabled={loading}
                />
              </Form.Item>

              <Form.Item
                name='description'
                initialValue={EquipmentData?.description || ''}
                rules={[
                  { required: false, message: "Gostaria de adicionar alguma Obervação?" }
                ]}
                className="FormItemEquipment"
              >
                <Input.TextArea
                  size="large"
                  placeholder="Gostaria de adicionar alguma Obervação?"
                  className="inputTextAreaEquipment"
                  allowClear
                  showCount
                  maxLength={250}
                  loading={loading}
                  disabled={loading}
                >
                </Input.TextArea>
              </Form.Item>

              {editEquipment ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="SaveButtonEquipment"
                  loading={loading}
                  disabled={loading}
                >
                  Atualizar Equipamento
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="SaveButtonEquipment"
                  loading={loading}
                  disabled={loading}
                >
                  Cadastrar Equipamento
                </Button>
              )}

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

export default Equipment;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`