import React, {
  useEffect,
  useState,
} from "react";
import { Col, List, Empty, Typography, notification, Select } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import styled from "styled-components";
import { CardSkeleton } from "../../Components/CardSkeleton";
import "./Style.less";
import { FilterReservations } from "../../Utils/Constants";
import SideMenu from "../../Components/SideMenu";
import CardReservation from "../../Components/CardReservation";

const Home = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterReservations, setFilterReservations] = useState(1);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [api, contextHolder] = notification.useNotification();

  function filtrarSomenteHoje(list) {
    return list?.filter((item) =>
      dayjs(item.date).isSame(dayjs(), 'day')
    );
  }

  function filtrarHojeEFuturas(list) {
    return list?.filter((item) =>
      dayjs(item.date).isSame(dayjs(), 'day') || dayjs(item.date).isAfter(dayjs(), 'day')
    );
  }

  const getReservations = async () => {
    const config = {
      headers: { Authorization: `Bearer ${userData.token}` }
    };

    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reservations/list`, config);
      // filteredReservationsToday(response?.data)
      const Today = filtrarSomenteHoje(response?.data);
      const Future = filtrarHojeEFuturas(response?.data);

      if (filterReservations === 1) setReservations(Today);
      else if (filterReservations === 2) setReservations(Future);
      else if (filterReservations === 3) setReservations(response?.data);
      else setReservations(response?.data);

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
  }

  useEffect(() => {
    getReservations(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterReservations]);

  return (

    <Container>
      {contextHolder}
      <Col span={4}>
        <SideMenu />
      </Col>
      <Col span={20}>
        <div className="ContainerHome">
          <Select
            size="large"
            placeholder="Tipo de sala"
            style={{ width: '50%', margin: '0 25%' }}
            defaultValue={1}
            allowClear
            onChange={(value) => { getReservations(value); setFilterReservations(value); }}
            options={(FilterReservations || []).map(reservation => ({
              value: reservation?.id,
              label: reservation?.label,
            }))}
          >
            {/* {FilterReservations?.map((reservation) => (
              <Select.Option key={reservation?.id} values={reservation?.id} >
                {reservation?.label}
              </Select.Option>
            ))} */}
          </Select>
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