import React, { useState } from "react";
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
  ContactsOutlined,
  QuestionCircleOutlined,
  DeleteTwoTone,
  EditTwoTone,
  FileTextOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import Classroom from "../assets/Classroom.jpg";
import Computer from "../assets/Informática.png";
import Library from "../assets/Biblioteca.png";
import Recap from "../assets/Reforco.png";
import Special from "../assets/Especial.jpeg";
import Sport from "../assets/Quadra.png";
import Test from "../assets/Prova.png";
import { FuncionalidadesList as Purposes } from "../Utils/Constants";

const { Text, Title } = Typography;

const CardReservation = ({ data, setReservations, editReservation }) => {
  const [userData] = useState(JSON.parse(localStorage.getItem("userData")));
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolder2] = message.useMessage();

  const renderImage = (id) => {
    if (id === "1" || id === "7") return Test;
    else if (id === "2") return Special;
    else if (id === "3") return Sport;
    else if (id === "4") return Library;
    else if (id === "5") return Computer;
    else if (id === "6") return Library;
    else if (id === "8" || id === "9") return Recap;
    else return Classroom;
  };

  const renderPurpose = (id) => {
    const found = Purposes.find((purpose) => purpose.id == id);
    return found ? `${found?.label}` : "Aula Padrão";
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

  const deleteReservation = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/reservations/list/${id}`
      );

      api.success({
        message: "Reserva excluída com sucesso!",
        description: "As informações da reserva foram deletadas.",
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
        message: "Erro ao excluir reserva",
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
      <Card
        loading={loading}
        style={{
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 1600,
          backgroundColor: "#79c7d9",
          border: "1px solid #2BB9D9",
        }}
        extra={
          canEditOrDelete && (
            <Space>
              {/* Botão editar */}
              {/* <Button
                type="icon"
                style={{ fontSize: "1.25rem" }}
                onClick={() => editReservation(data?.id)}
              >
                <EditTwoTone twoToneColor="#FFA500" />
              </Button> */}

              {/* Botão excluir */}
              <Popconfirm
                title="Excluir Reserva?"
                description={
                  <Text>
                    Tem certeza que deseja excluir a reserva? Todas as
                    informações ligadas a esta reserva serão deletadas.
                  </Text>
                }
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => deleteReservation(data.id)}
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
          <Col flex="200px">
            <Image
              src={renderImage(data?.purpose) || Classroom}
              alt="Sala"
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
              <Title level={5} style={{ margin: 0 }}>
                {data?.Classroom?.name} | {renderPurpose(data?.purpose)} |{" "}
                {capitalizedDate}
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
                    <ReadOutlined /> Professor(a):
                  </Text>
                  <br />
                  <Text style={{ fontSize: "16px" }}>
                    {data?.User?.surname || data?.User?.name} -{" "}
                    {data?.User?.subject}
                  </Text>
                </Col>

                {/* Turma */}
                <Col>
                  <Text strong style={{ fontSize: "16px" }}>
                    <ContactsOutlined /> Turma:
                  </Text>
                  <br />
                  <Text style={{ fontSize: "16px" }}>
                    {data?.Class?.grade}º {data?.Class?.className} -{" "}
                    {data?.Class?.shift}
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

export default CardReservation;
