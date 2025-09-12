import React, {
  useEffect,
  useState,
} from "react";
import { Row, Col, List, Empty, Typography, notification, Tooltip, DatePicker, Button, Drawer } from "antd";
import { ReloadOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import axios from "axios";
import styled from "styled-components";
import { CardSkeleton } from "../../Components/CardSkeleton";
import "./Style.less";
import SideMenu from "../../Components/SideMenu";
import TopMenu from "../../Components/TopMenu";
import CardReservation from "../../Components/CardReservation";
import CardEquipmentReservation from "../../Components/CardEquipmentReservation";
import Loading from "../../Components/Loading";

const Home = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const dateFormat = 'DD/MM/YYYY';

  localStorage.removeItem("googleUser");

  const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
  const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  const disabledDate = (current) => {
    return current && (current.day() === 0 || current.day() === 6);
  };

  function filteredToday(list) {
    return list?.filter((item) =>
      dayjs(item.date).isSame(dayjs(), 'day')
    );
  }

  const handleSetToday = () => {
    setSelectedDate(dayjs());
  };

  const fetchAllReservations = async (date = null) => {
    setLoading(true);
    try {
      const [regularRes, equipmentRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/reservations/list`),
        axios.get(`${import.meta.env.VITE_API_URL}/equipments-reservations/list`)
      ]);

      const regular = regularRes?.data || [];
      const equipments = equipmentRes?.data || [];

      const filterByDate = (items) =>
        date
          ? items.filter((item) => dayjs(item.date).isSame(dayjs(date), 'day'))
          : filteredToday(items);

      const combined = [
        ...filterByDate(regular),
        ...filterByDate(equipments),
      ];

      combined.sort((a, b) => {
        const aEarliest = a.time?.length ? dayjs(a.time.sort()[0], 'HH:mm') : dayjs(0);
        const bEarliest = b.time?.length ? dayjs(b.time.sort()[0], 'HH:mm') : dayjs(0);
        return aEarliest.diff(bEarliest);
      });

      setReservations(combined);
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
    sessionStorage.removeItem('editReservationId');
    sessionStorage.removeItem("editEquipmentReservationId");
    fetchAllReservations(selectedDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
  }, [reservations]);

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
      <Col span={window.innerWidth < 1025 ? 24 : 20} style={window.innerWidth < 1025 ? { marginTop: '5rem' } : { marginTop: '1vh' }}>
        <div className="ContainerHome">
          <div style={{ display: 'flex', margin: '0 auto', alignItems: 'center', justifyContent: 'center' }}>
            <Tooltip placement="bottom" title={'Selecione uma data para ver as demais reservas'}>
              <DatePicker
                format={dateFormat}
                defaultValue={dayjs()}
                value={selectedDate}
                size="large"
                placeholder={dataCapitalizada}
                disabled={loading}
                style={{ width: '15rem' }}
                allowClear
                onChange={(value) => {
                  setSelectedDate(value);
                }}
                disabledDate={disabledDate}
              />
            </Tooltip>
            <Tooltip placement="bottom" title={'Clique aqui para recarregar as reservas'}>
              <Button
                style={{ height: '2.5rem', margin: '0 10px' }}
                onClick={() => { fetchAllReservations(); handleSetToday(); }}
              >
                <ReloadOutlined width='40' />
              </Button>
            </Tooltip>
          </div>

          {loading ? (
            <List
              itemLayout="horizontal"
              size="large"
              dataSource={reservations}
              className="ListReservations"
              renderItem={() => (
                [...Array(4)].map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              )}
            />
          ) : reservations?.length > 0 ? (
            <List
              itemLayout="horizontal"
              size="large"
              dataSource={reservations}
              className="ListReservations"
              renderItem={(item) => (
                <List.Item key={item.id}>
                  {item?.classId ? (
                    <CardReservation
                      data={item}
                      setReservations={setReservations}
                    />
                  ) : (
                    <CardEquipmentReservation
                      data={item}
                      setReservations={setReservations}
                    />
                  )}
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

export default Home;


const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`