import React, {
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { Col, Row, Card, Image, Typography, Tag, Button, Popconfirm, message, notification } from "antd";
import dayjs from "dayjs";
import "./Style.less";
// const userData = JSON.parse(localStorage.getItem('userData'));

import {
  ClockCircleOutlined,
  ReadOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  DeleteTwoTone,
} from '@ant-design/icons';

import Infra from '../assets/Infrastructure.png';
import Music from '../assets/Music.png';
import Audio from '../assets/Som.png';
import Sport from '../assets/Sports.png';
import Video from '../assets/Video.png';
import Acessorio from '../assets/acessorio.png'

const CardEquipmentReservation = (Data) => {
  const { data, setReservations } = Data;
  const [userData] = useState(JSON.parse(localStorage.getItem('userData')));
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolder2] = message.useMessage();

  const renderImage = (id) => {
    if (id === 'Audio') return Audio;
    else if (id === 'Vídeo') return Video;
    else if (id === 'Infraestrutura') return Infra;
    else if (id === 'Esportes') return Sport;
    else if (id === 'Música') return Music;
    else if (id === 'Acessório') return Acessorio;
  }

  const cancel = () => {
    messageApi.open({
      type: 'warning',
      content: 'Exclusão cancelada',
    });
  };

  const deleteItemFromArray = (idToRemove) => {
    setReservations(prevItems => prevItems.filter(item => item.id !== idToRemove));
  };

  const deleteEquipmentReservation = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/equipments-reservations/list/${id}`);

      api.success({
        message: 'Reserva de equipamento excluida com sucesso!',
        description: 'As informações da reserva de quipamento foram deletadas.',
        showProgress: true,
        duration: 2,
        placement: "top",
      });
      setTimeout(() => {
        deleteItemFromArray(data?.id);
        setLoading(false);
      }, 1750);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao excluir reserva de equipamento',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.',
        showProgress: true,
        duration: 2,
        placement: "top",
      });
      setTimeout(() => {
        setLoading(false);
      }, 1750);
    }
  }

  useEffect(() => {
  }, [data, loading, userData])

  const formattedDate = dayjs(data.date).format("dddd, DD/MM/YYYY");
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <>
      {contextHolder}
      {contextHolder2}
      <Card
        className="Reservation no-padding-head"
        extra={
          (data?.userId === userData.id ||
          userData?.rulets === 'Diretor(a)' ||
          userData?.rulets === 'Coordenador(a)') && (
            <>
              {/* <Button
                type="icon"
                style={{ fontSize: '1.25rem', position: 'absolute', top: 5, right: 45 }}
                // onClick={() => editEquipment(equipment?.id)}
              >
                <EditTwoTone twoToneColor="#FFA500" />
              </Button> */}
              <Popconfirm
                title="Excluir Reserva de Equipamento?"
                description={
                  <>
                    <Typography.Text>
                      Tem certeza que deseja excluir a reserva de equipamento, todas as informações ligadas a esta reserva serão deletadas!
                    </Typography.Text>
                  </>
                }
                autoAdjustOverflow
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => deleteEquipmentReservation(data?.id)}
                onCancel={cancel}
                okText="Deletar"
                cancelText="Cancelar"
              >
                <Button
                  type="icon"
                  style={{ fontSize: '1.25rem', position: 'absolute', top: 5, right: 0 }}
                >
                  <DeleteTwoTone twoToneColor="#F00" />
                </Button>
              </Popconfirm>
            </>
          )
        }

        styles={window.innerWidth > 1025 ? {
          body: { display: 'flex' }
        } : window.innerWidth > 415 ? {
          body: { display: 'flex', flexDirection: 'row', padding: '15px 10px', height: 'auto' }
        } : {
          body: { display: 'flex', flexDirection: 'column', padding: '15px 10px', height: 'auto' }
        }}

      >
        <Col
          span={window.innerWidth > 1025 ? 4 : window.innerWidth > 415 ? 6 : 20}
          style={
            window.innerWidth > 1025 ? { margin: 'auto' } :
              window.innerWidth > 415 ? { margin: 'auto' } :
                { margin: 'auto' }
          }
        >
          <Image
            src={renderImage(data?.Equipment?.type)}
            className="ImageResv"
          />
        </Col>
        <Col
          span={window.innerWidth > 1025 ? 19 : window.innerWidth > 415 ? 12 : 24} offset={1}
          style={
            window.innerWidth > 1025 ? { margin: 'auto' } :
              window.innerWidth > 415 ? { margin: 'auto', justifyContent: 'space-between' } :
                { margin: 'auto' }
          }
        >
          <Row>
            <Typography.Text className="TitleResv">
              Equipamento: {data?.Equipment?.name} | {capitalizedDate}
            </Typography.Text>
          </Row>
          <Row justify="space-between">
            <Col
              span={window.innerWidth > 1025 ? 14 : 12}
              className="TextCommon"
            >
              <Typography.Text className="TextResv">
                Horário(s):
              </Typography.Text>
            </Col>

            <Col
              span={window.innerWidth > 1025 ? 7 : 12}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex' }}>
                <ClockCircleOutlined />
              </div>
              <div style={{ textAlign: 'end', gap: '10px' }}>
                <Typography.Text className="TextCommon">
                  {data?.time?.slice().sort().map((time) => {
                    return (
                      <Tag
                        color="blue"
                        key={time}
                        style={
                          window.innerWidth > 1280 ? {
                            fontSize: '1rem',
                            padding: 5
                          } :
                            window.innerWidth > 415 ? {
                              fontSize: '.75rem',
                              padding: 3
                            } : {
                              fontSize: '.65rem',
                              padding: 3
                            }}
                      >
                        {time} Hs
                      </Tag>
                    )
                  })}
                </Typography.Text>
              </div>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col
              span={window.innerWidth > 1025 ? 14 : 12} className="TextCommon"
            >
              <Typography.Text ellipsis className="TextResv">
                Professor(a):
              </Typography.Text>
            </Col>

            <Col
              span={window.innerWidth > 1025 ? 7 : 12}
              style={{ display: 'flex' }}
            >
              <ReadOutlined />
              <Typography.Text ellipsis className="TextCommon" style={{ textAlign: 'end', marginRight: '2.5vw' }}>
                {data?.User?.surname || data?.User?.name} - {data?.User?.subject}
              </Typography.Text>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={window.innerWidth > 1025 ? 14 : 12} className="TextCommon">
              <Typography.Text className="TextResv">
                Turma:
              </Typography.Text>
            </Col>

            <Col
              span={window.innerWidth > 1025 ? 7 : 12}
              style={{ display: 'flex' }}
            >
              <AppstoreOutlined />
              <Typography.Text className="TextCommon" style={{ textAlign: 'end', marginRight: '2.5vw' }}>
                {data?.Equipment?.type}
              </Typography.Text>
            </Col>
          </Row>
          {data?.description && (
            <Row justify="space-between">
              <Col span={3} className="TextCommon">
                <Typography.Text className="TextResv">
                  Descrição:
                </Typography.Text>
              </Col>
              <Col span={20}>
                <Typography.Text className="TextCommon">
                  {data?.description}
                </Typography.Text>
              </Col>
            </Row>
          )}
        </Col>
      </Card>
    </>
  )
}

export default CardEquipmentReservation;