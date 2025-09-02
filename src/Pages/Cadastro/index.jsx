import React, { useState, useEffect, useRef } from "react";
import packageJson from '../../../package.json';
import { Link, useNavigate } from "react-router";
import axios from "axios";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";
import Logo from '../../assets/Logo.jpg';
import { UserDataContext } from '../../Providers/UserData';

import {
  CalendarOutlined,
  MailOutlined,
  UserAddOutlined,
  LockOutlined,
  TeamOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Row, Col, Avatar, Form, Input, Select, Button, Typography, notification } from 'antd';

import {
  CargosList as Cargos,
  DisciplinasList as Disciplinas,
} from "../../Utils/Constants";
import GoogleLoginComponent from "../../Components/GoogleLogin";

const Cadastro = () => {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const [FullName, setFullName] = useState("");
  const [filteredCargos, setFilteredCargos] = useState([]);
  const [filteredDisciplinas, setFilteredDisciplinas] = useState(Disciplinas);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const googleData = JSON.parse(localStorage.getItem("googleUser") || "{}");
  const { setUserData } = React.useContext(UserDataContext);

  const Navigate = useNavigate()

  // const goToLogin = () => {
  //   Navigate('/login')
  // }

  const goToHome = () => {
    Navigate('/home')
  }

  const Register = async (data) => {
    const { name, email, password, rulets, subject } = data;
    const body = { name, email, password, rulets, subject }
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, body);

      const loginBody = {
        email: body.email,
        password: body.password
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, loginBody);
      const user = {
        id: response?.data?.user?.id,
        name: response?.data?.user?.name,
        email: response?.data?.user?.email,
        surname: response?.data?.user?.surname,
        rulets: response?.data?.user?.rulets,
        shift: response?.data?.user?.shift,
        subject: response?.data?.user?.subject,
      };
      const serializableUser = JSON.stringify(user);
      localStorage.setItem("userData", serializableUser);
      localStorage.setItem("token", response?.data?.token?.token);

      api.success({
        message: 'Usuário cadastrado com sucesso!',
        description: 'As informações do novo usuário foram salvas com sucesso, você será redirecionado para a página inicial.',
        showProgress: true,
        duration: 2.5,
        placement: "top"
      });
      setTimeout(() => {
        setLoading(false);
        setUserData(user);
        goToHome();
      }, 2500);
    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao Cadastrar usuário',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.',
        showProgress: true,
        duration: 2.5,
        placement: "top"
      });
      setTimeout(() => {
        setLoading(false);
      }, 2250);
    }
  }

  const onFinish = (values) => {
    setFullName(values.FullName);
    setEmail(values.Email);
    setPassword(values.Password);
    Register(values);
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


  const handleSearchCargos = (value) => {
    if (!value) {
      setFilteredCargos(Cargos);
    } else {
      const filtered = Cargos?.filter((cargo) =>
        cargo?.label?.toLowerCase().includes(value?.toLowerCase())
      );
      setFilteredCargos(filtered);
    }
  };

  const handleSearchDisciplinas = (value) => {
    if (!value) {
      setFilteredDisciplinas(Disciplinas);
    } else {
      const filtered = Disciplinas?.filter((disciplina) =>
        disciplina?.label?.toLowerCase().includes(value?.toLowerCase())
      );
      setFilteredDisciplinas(filtered);
    }
  };

  console.log(googleData?.name);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    setFilteredCargos(Cargos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cargos]);

  useEffect(() => {
    setFilteredDisciplinas(Disciplinas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Disciplinas]);

  useEffect(() => {
    if (googleData) {
      form.setFieldsValue({
        name: googleData?.name || '',
        email: googleData?.email || '',
        password: googleData?.password || '',
        ConfirmPassword: googleData?.password || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

  }, [FullName, Email, Password,]);

  return (
    <Container>
      {contextHolder}
      <Row justify='center' align='middle' style={{ height: '90vh' }}>
        <Col span={14}>
          <Row justify="center">
            <Avatar
              className="AvatarRegister"
              src={Logo || undefined}
              icon={!Logo ? <CalendarOutlined /> : undefined}
            />
          </Row>

          <Row justify="center" style={{ marginTop: "20px" }}>
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >

              {/* Fullname */}
              <Form.Item
                name='name'
                initialValue={googleData?.name || ''}
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira seu nome.',
                  },
                ]}
              >
                <Input
                  prefix={<UserAddOutlined />}
                  ref={inputRef}
                  size="large"
                  placeholder="Nome completo"
                  disabled={loading}
                  // defaultValue={googleData.nome || ""}
                  className="InputRegister"
                  allowClear
                  type="text"
                >

                </Input>
              </Form.Item>

              <Form.Item
                name='rulets'
                // initialValue={UserData?.rulets || ''}
                rules={[
                  { required: true, message: "Por favor selecione um cargo." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  prefix={<TeamOutlined />}
                  showSearch
                  size="large"
                  placeholder="Cargo"
                  disabled={loading}
                  // defaultValue={googleData.email || ""}
                  className="InputRegister"
                  allowClear
                  onSearch={handleSearchCargos}
                  filterOption={false}
                >
                  {filteredCargos.map((cargo) => (
                    <Select.Option key={cargo?.label} values={cargo?.label} >
                      {cargo?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='subject'
                // initialValue={UserData?.subject || ''}
                rules={[
                  { required: true, message: "Por favor selecione um disciplina." }
                ]}
                className="FormItemProfile"
              >
                <Select
                  prefix={<BookOutlined />}
                  showSearch
                  size="large"
                  placeholder="Disciplina"
                  disabled={loading}
                  className="InputRegister"
                  allowClear
                  onSearch={handleSearchDisciplinas}
                  filterOption={false}
                >
                  {filteredDisciplinas.map((disciplina) => (
                    <Select.Option key={disciplina?.label} value={disciplina?.label}>
                      {disciplina?.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Email */}
              <Form.Item
                name='email'
                initialValue={googleData?.email || ''}
                rules={[
                  { required: true, message: 'Por favor, insira seu e-mail.' },
                  { pattern: Constants.emailRegex, message: "Por favor, insira um e-mail válido!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  size="large"
                  placeholder="Email"

                  className="InputRegister"
                  allowClear
                  type="text"
                  disabled={loading}
                >

                </Input>
              </Form.Item>

              {/* Password */}
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Por favor, insira sua senha.' },
                  { pattern: Constants.passwordRegex, message: "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial." },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="Senha"

                  className="InputRegister"
                  allowClear
                  disabled={loading}
                >

                </Input.Password>
              </Form.Item>

              {/* Confirm Password */}
              <Form.Item
                name='ConfirmPassword'
                rules={[
                  { required: true, message: 'Por favor, insira sua senha.' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('As senhas não correspondem!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="Confirme a Senha"
                  dependencies={['password']}

                  className="InputRegister"
                  allowClear
                  disabled={loading}
                >

                </Input.Password>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="SubmitButtonRegister"
                  disabled={loading}
                  loading={loading}
                >
                  Cadastrar
                </Button>
              </Form.Item>

            </Form>

          </Row>


          <Row justify='center' style={{ marginTop: "10px", marginBottom: "25px" }}>
            <Link to="/login" className="LinkButtonRegister">
              Já possui cadastro? Acesse aqui.
            </Link>
          </Row>

          <Row justify='center' style={{ marginTop: "10px" }}>
            <GoogleLoginComponent />
          </Row>

          <Row>
            <Typography.Text className="VersionRegister" style={{ marginTop: "25px", marginBottom: "50px" }}>
              Versão: {packageJson.version}
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Cadastro;

const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
`