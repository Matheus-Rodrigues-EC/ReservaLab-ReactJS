import React, {
  useEffect,
  useState,
} from "react";
import { Col, List, Empty, Typography, notification, Tooltip, DatePicker } from "antd";
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
  const [selectedDate, setSelectedDate] = useState(null);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [api, contextHolder] = notification.useNotification();
  const dateFormat = 'DD/MM/YYYY';

  const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
  const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  const disabledDate = (current) => {
    return current && (current < dayjs().startOf('day') || current.day() === 0 || current.day() === 6);
  };

  function filteredToday(list) {
    return list?.filter((item) =>
      dayjs(item.date).isSame(dayjs(), 'day')
    );
  }

  const getReservations = async (date = null) => {
    const config = {
      headers: { Authorization: `Bearer ${userData.token}` }
    };

    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reservations/list`, config);

      const allReservations = response?.data;
      let filtered = [];

      if (date) {
        // Se há uma data selecionada, filtra por ela
        filtered = allReservations.filter((item) =>
          dayjs(item.date).isSame(dayjs(date), 'day')
        );
      } else {
        // Caso contrário, filtra pelas reservas de hoje
        filtered = filteredToday(allReservations);
      }

      setReservations(filtered);

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
  };


  useEffect(() => {
    getReservations(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (

    <Container>
      {contextHolder}
      <Col span={4}>
        <SideMenu />
      </Col>
      <Col span={20}>
        <div className="ContainerHome">
          <Tooltip placement="bottom" title={'Selecione uma data para ver as demais reservas'}>
            <DatePicker
              format={dateFormat}
              defaultValue={dayjs()}
              size="large"
              placeholder={dataCapitalizada}
              disabled={loading}
              style={{ width: '290px', display: 'flex', margin: '0 auto' }}
              allowClear
              onChange={(value) => {
                // value será `null` se o usuário limpar o campo
                setSelectedDate(value);
              }}
              disabledDate={disabledDate}
            />
          </Tooltip>

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
                  {selectedDate ? (
                    'Nenhuma Reserva Agendada Para a Data Selecionada '
                  ) : (
                    'Nenhuma Reserva Agendada Para Hoje'
                  )}
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