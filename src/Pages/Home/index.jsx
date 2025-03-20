import React, {
  useEffect,
} from "react";
import { Col, Row, Card, List, Button, Empty, Typography } from "antd";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";

import SideMenu from "../../Components/SideMenu";
import CardReservation from "../../Components/CardReservation";

const Home = () => {

  const data = Constants?.data;

  useEffect(() => {

  }, [data]);

  return (

    <Container>
      <Col span={4}>
        <SideMenu />
      </Col>
      <Col span={20}>
        <div className="Container">
          {data.length > 0 ? (
            <List
              itemLayout="horizontal"
              size="large"
              dataSource={data}
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