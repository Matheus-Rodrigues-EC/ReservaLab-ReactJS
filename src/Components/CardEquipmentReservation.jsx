import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Col,
  Row,
  Card,
  Image,
  Typography,
  Tag,
  Button,
  Popconfirm,
  notification,
  message,
  Space,
  Divider,
} from "antd";
import {
  ClockCircleOutlined,
  ReadOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
  FileTextOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "./Style.less";
import Loading from "../Components/Loading";

import Infra from "../assets/Infrastructure.png";
import Music from "../assets/Music.png";
import Audio from "../assets/Som.png";
import Sport from "../assets/Sports.png";
import Video from "../assets/Video.png";
import Acessorio from "../assets/acessorio.png";

const { Text, Title } = Typography;

const CardEquipmentReservation = ({ data, setReservations }) => {
  const [userData] = useState(JSON.parse(localStorage.getItem("userData")));
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolder2] = message.useMessage();
  const Navigate = useNavigate();

  const renderImage = (id) => {
    if (id === "Audio") return Audio;
    else if (id === "Vídeo") return Video;
    else if (id === "Infraestrutura") return Infra;
    else if (id === "Esportes") return Sport;
    else if (id === "Música") return Music;
    else if (id === "Acessório") return Acessorio;
    else return Infra;
  };

  const cancel = () => {
    messageApi.open({
      type: "warning",
      content: "Exclusão cancelada",
    });
  };

  const deleteItemFromArray = (idToRemove) => {
    setReservations((prevItems) =>
      prevItems.filter((item) => item.id !== idToRemove)
    );
  };

  const editEquipmentReservation = (id) => {
    sessionStorage.setItem("editEquipmentReservationId", id);
    Navigate("/equipment-reservation");
  }

  const deleteEquipmentReservation = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/equipments-reservations/list/${id}`
      );

      api.success({
        message: "Reserva de equipamento excluída com sucesso!",
        description: "As informações da reserva de equipamento foram deletadas.",
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
        message: "Erro ao excluir reserva de equipamento",
        description:
          error.response?.data?.message ||
          "Ocorreu um erro inesperado. Tente novamente.",
        duration: 2,
        placement: "top",
      });
      setTimeout(() => {
        setLoading(false);
      }, 1750);
    }
  };

  const formattedDate = dayjs(data.date).format("dddd, DD/MM/YYYY");
  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const canEditOrDelete =
    data?.userId === userData.id ||
    userData?.rulets === "Diretor(a)" ||
    userData?.rulets === "Coordenador(a)";

  return (
    <Col span={24} className="actions">
      {contextHolder}
      {contextHolder2}
      {loading && <Loading />}
      <Card
        loading={loading}
        style={{
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          backgroundColor: "#79c7d9",
          border: "1px solid #2BB9D9",
        }}
        extra={
          canEditOrDelete && (
            <Space>
              {/* Botão editar */}
              <Button
                type="icon"
                style={{ fontSize: "1.25rem" }}
                onClick={() => editEquipmentReservation(data?.id)}
              >
                <EditTwoTone twoToneColor="#FFA500" />
              </Button>

              {/* Botão excluir */}
              <Popconfirm
                title="Excluir Reserva de Equipamento?"
                description={
                  <Text>
                    Tem certeza que deseja excluir a reserva de equipamento? Todas as informações ligadas a esta reserva serão deletadas.
                  </Text>
                }
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => deleteEquipmentReservation(data.id)}
                onCancel={cancel}
                okText="Deletar"
                cancelText="Cancelar"
              >
                <Button type="icon" style={{ fontSize: "1.25rem" }}>
                  <DeleteTwoTone twoToneColor="#F00" />
                </Button>
              </Popconfirm>
            </Space>
          )
        }
      >
        <Row gutter={16} align="top">
          {/* Imagem lateral */}
          <Col flex="auto" style={{ maxWidth: 300, display: "flex", justifyContent: "center" }}>
            <Image
              src={renderImage(data?.Equipment?.type)}
              alt="Equipamento"
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "12px",
                border: '1px solid #2BB9D9'
              }}
              preview={false}
            />
          </Col>

          {/* Conteúdo à direita */}
          <Col flex="auto">
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              {/* Cabeçalho */}
              <Title level={5} style={{ margin: 0, textAlign: "left" }}>
                Equipamento: {data?.Equipment?.name}
              </Title>
              {/* <Title level={5} style={{ margin: 0, textAlign: "left" }}>
                Tipo: {data?.Equipment?.type}
              </Title> */}
              <Title level={5} style={{ margin: 0, textAlign: "left" }}>
                Data: {capitalizedDate}
              </Title>

              <Divider style={{ margin: "8px 0" }} />

              {/* Horários | Professor | Turma lado a lado */}
              <Row gutter={32}>
                {/* Horários */}
                <Col>
                  <Text strong style={{ fontSize: "16px" }}>
                    <ClockCircleOutlined /> Horários:
                  </Text>
                  <br />
                  <Space wrap>
                    {data?.time
                      ?.slice()
                      .sort()
                      .map((time) => (
                        <Tag
                          key={time}
                          color="blue"
                          style={{
                            fontSize: "16px",
                            padding: "4px 10px",
                            marginTop: 4,
                          }}
                        >
                          {time} Hs
                        </Tag>
                      ))}
                  </Space>
                </Col>

                {/* Professor */}
                <Col>
                  <Text strong style={{ fontSize: "16px" }}>
                    <ReadOutlined /> Professor(a):{' '}
                  </Text>
                  <Text style={{ fontSize: "16px" }}>
                    {data?.User?.surname || data?.User?.name?.split(" ")[0]} - {data?.User?.subject}
                  </Text>
                </Col>

                {/* Tipo de Equipamento */}
                <Col>
                  <Text strong style={{ fontSize: "16px" }}>
                    <AppstoreOutlined /> Tipo:{' '}
                  </Text>
                  <Text style={{ fontSize: "16px" }}>
                    {data?.Equipment?.type}
                  </Text>
                </Col>
              </Row>

              {/* Descrição */}
              {data?.description && (
                <>
                  <Divider style={{ margin: "8px 0" }} />
                  <Text strong style={{ fontSize: "16px" }}>
                    <FileTextOutlined /> Descrição:
                  </Text>
                  <Text type="secondary">{data?.description}</Text>
                </>
              )}
            </Space>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default CardEquipmentReservation;