import React, {
  useEffect,
  useState,
} from "react";
import { Col, List, Empty, Typography } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import styled from "styled-components";
import "./Style.less";

import SideMenu from "../../Components/SideMenu";
import CardReservation from "../../Components/CardReservation";

const Home = () => {
  const [reservations, setReservations] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const filteredReservationsToday = () => {
    const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
    const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
    const filtered = reservations.map((item) => {
      if(item.date === dataCapitalizada)
        return item
    });
    return filtered;
  }

  const getReservations = async () => {
    const config = {
      headers: {Authorization: `Bearer ${userData.token}`}
  }
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/reservations/list`, config);
    setReservations(response?.data);
  }

  useEffect(() => {
    getReservations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <Container>
      <Col span={4}>
        <SideMenu />
      </Col>
      <Col span={20}>
        <div className="ContainerHome">
          {filteredReservationsToday.length > 0 ? (
            <List
              itemLayout="horizontal"
              size="large"
              dataSource={filteredReservationsToday}
              className="ListReservations"
              renderItem={(item) => (
                <List.Item >
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