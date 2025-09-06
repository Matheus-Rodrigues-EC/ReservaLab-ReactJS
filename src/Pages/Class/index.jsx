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
  TurmaList as Turmas,
  TurnoList as Turnos,
} from "../../Utils/Constants";

import SideMenu from "../../Components/SideMenu";
import TopMenu from "../../Components/TopMenu";
import Loading from "../../Components/Loading";

const Class = () => {
  const [form] = Form.useForm();
  const data = Constants?.data;
  const Navigate = useNavigate()
  const [Visible, setVisible] = useState(false);
  const [ClassData, setClassData] = useState();
  const editClass = JSON.parse(localStorage.getItem('EditClass'));
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const goToClasses = () => {
    Navigate('/classes')
  }

  const createClass = async (data) => {
    const body = {
      ...data,
      grade: Number(data.grade)
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/classes/create`, body);

      api.success({
        message: 'Turma Cadastrada!',
        description: 'A turma cadastrada foi salva com sucesso.',
        showProgress: true,
        duration: 2,
        placement: "top"
      });

      setTimeout(() => {
        setLoading(false);
        goToClasses();
      }, 2250);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao cadastrar turma',
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

  const updateClass = async () => {
    const body = {
      grade: form.getFieldValue('grade'),
      className: form.getFieldValue('className'),
      shift: form.getFieldValue('shift'),
      description: form.getFieldValue('description'),
    };

    try {
      setLoading(true);

      await axios.patch(`${import.meta.env.VITE_API_URL}/classes/${editClass}/update`, body);

      api.success({
        message: 'Turma Atualizada!',
        description: 'As informações da turma foram atualizadas com sucesso.',
        showProgress: true,
        duration: 2,
        placement: 'top',
      });

      setTimeout(() => {
        setLoading(false);
        goToClasses();
      }, 2250);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao atualizar turma',
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


  const getClass = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/classes/list/${id}`);
    setClassData(response?.data)
  }

  const onFinish = (values) => {
    // console.log('Success:');
    if (editClass) {
      updateClass(values);
      console.log(Number(ClassData.grade));
      console.log('update')
    } else {
      createClass(values);
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
    if (editClass)
      getClass(editClass);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (ClassData) {
      form.setFieldsValue({
        grade: ClassData.grade,
        className: ClassData.className,
        shift: ClassData.shift,
        description: ClassData.description,
      });
    }
  }, [ClassData, form, data]);

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
        <Typography.Title
          level={2}
          style={{ textAlign: 'center' }}
        >
          {editClass ? 'Atualizar Turma' : 'Cadastrar Turma'}
        </Typography.Title>
        <div className="ContainerClass">
          <Col span={24}>
            <Form
              form={form}
              layout="vertical"
              name="Serie"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                label="Série/Ano"
                name='grade'
                initialValue={ClassData?.grade || null}
                rules={[
                  { required: true, message: "Por favor, insira a série/ano da turma." },
                  { pattern: Constants.serieRegex, message: "Por favor, insira uma série/ano válida!" },
                ]}
                className="FormItemProfile"
              >

                <Input
                  size="large"
                  placeholder="Série/Ano"
                  suffix='º'
                  className="InputClass"
                  allowClear
                  type="number"
                  min='1'
                  max='9'
                />
              </Form.Item>

              <Form.Item
                label="Turma"
                name='className'
                initialValue={ClassData?.className || null}
                rules={[
                  { required: true, message: "Por favor insira a turma referente a série." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  size="large"
                  placeholder="Turma"
                  className="InputClass"
                  allowClear
                >
                  {Turmas.map((turma) => (
                    <Select.Option key={turma?.label} values={turma?.label} >
                      {turma?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Turno"
                name='shift'
                initialValue={ClassData?.shift || null}
                rules={[
                  { required: true, message: "Por favor selecione o turno da turma." },
                ]}
                className="FormItemProfile"
              >
                <Select
                  size="large"
                  placeholder="Turno"
                  className="InputClass"
                  allowClear
                >
                  {Turnos.map((turno) => (
                    <Select.Option key={turno?.label} values={turno?.label} >
                      {turno?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Descrição (opcional)"
                name='description'
                initialValue={ClassData?.description || ''}
                rules={[
                  { required: false, message: "Gostaria de adicionar alguma Descrição?" }
                ]}
                className="FormItemProfile"
              >
                <Input.TextArea
                  size="large"
                  placeholder="Gostaria de adicionar alguma Obervação?"
                  className="inputTextAreaClass"
                  allowClear
                  showCount
                  maxLength={250}
                >
                </Input.TextArea>
              </Form.Item>

              <Row>
                <Button
                  type="danger"
                  className="CancelClassButton"
                  onClick={goToClasses}
                  loading={loading}
                  disabled={loading}
                >
                  Cancelar
                </Button>

                {editClass ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="ClassButton"
                    loading={loading}
                    disabled={loading}
                  >
                    Atualizar Turma
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="ClassButton"
                    loading={loading}
                    disabled={loading}
                  >
                    Cadastrar Turma
                  </Button>
                )}
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

export default Class;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`