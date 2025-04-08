import React, {
  useEffect,
  useState,
} from "react";
import { Col, List, Empty, Typography, notification, Skeleton } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import styled from "styled-components";
import { CardSkeleton } from "../../Components/CardSkeleton";
import "./Style.less";

import SideMenu from "../../Components/SideMenu";
import CardReservation from "../../Components/CardReservation";

const Home = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [api, contextHolder] = notification.useNotification();

  const filteredReservationsToday = (list) => {
    const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
    const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

    const filtered = list
      ?.filter((item) => item.date === dataCapitalizada)
      .sort((a, b) => {
        return dayjs(a.time, "HH:mm").isBefore(dayjs(b.time, "HH:mm")) ? -1 : 1;
      });
    setReservations(filtered);
    return filtered;
  }

  const getReservations = async () => {
    const config = {
      headers: { Authorization: `Bearer ${userData.token}` }
    };

    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reservations/list`, config);
      filteredReservationsToday(response?.data)

      // api.success({
      //   message: 'Sala Cadastrada!',
      //   description: 'A sala cadastrada foi salva com sucesso.',
      //   showProgress: true,
      //   duration: 2,
      //   placement: "top"
      // });

      // setTimeout(() => {
      //   setLoading(false);
      //   goToHome();
      // }, 2250);

    } catch (error) {
      console.error(error);

      api.error({
        message: 'Erro ao Carregar reservas',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.',
        showProgress: true,
        duration: 2,
        placement: "top",
      });
    } finally {
      setLoading(false);
    }
    // console.log(response.data);
  }

  useEffect(() => {
    getReservations();
    filteredReservationsToday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <Container>
      {contextHolder}
      <Col span={4}>
        <SideMenu />
      </Col>
      <Col span={20}>
        <div className="ContainerHome">
          {loading ? (
            [...Array(4)].map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : reservations?.length > 0 ? (
            <List
              itemLayout="horizontal"
              size="large"
              dataSource={reservations}
              className="ListReservations"
              renderItem={(item) => (
                <List.Item>
                  <CardReservation data={item} />
                </List.Item>
              )}
            />
          ) : (
            <Empty
              className="EmpityMessage"
              description={
                <Typography.Text
                  className="EmpityMessage"
                  color="#A5BFA4"
                >
                  Nenhuma Reserva Agendada para hoje
                </Typography.Text>
              }
            />
          )}
        </div>

      </Col>
    </Container>
  )
}

export default Home;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`