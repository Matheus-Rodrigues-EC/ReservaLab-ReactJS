/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
} from "react";
import { Col, Row, Card, Skeleton, Image, Typography } from "antd";
import "./Style.less";

import {
  ClockCircleOutlined,
  ReadOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

import Info from '../assets/Informática.png';
import Sport from '../assets/Quadra.png'
import Libr from '../assets/Biblioteca.png';
import Test from '../assets/Prova.png';
import Recap from '../assets/Reforco.png';
import classroom from '../assets/Classroom.jpg';

const CardReservation = (Data) => {
  const { data } = Data;
  const [loading, setLoading] = useState(false);

  const renderImage = (id) => {
    if(id === '1') return Info;
    else if(id === '2') return Sport;
    else if(id === '3') return Libr;
    else if(id === '4') return Test;
    else if(id === '5') return Recap;
    else return classroom;
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      {loading ? (

        <Skeleton loading={loading} active avatar>
        </Skeleton>
      ) : (
        <Card
          className="Reservation"
          bodyStyle={{ display: 'flex' }}
        >

          <Col span={4} >
            <Image
              src={renderImage(data?.Classroom?.classType)}
              className="3"
            />
          </Col>
          <Col span={19} offset={1}>
            <Row>
              <Typography.Title style={{ fontSize: '2.25vw' }} className="TitleResv">
                {data?.Classroom?.name} - {data?.User?.subject}
              </Typography.Title>
            </Row>
            <Row justify="space-between">
              <Col span={14} className="TextCommon">
                <Typography.Text className="TextResv">
                  Horário:
                </Typography.Text>
              </Col>

              <Col span={1} className="TextCommon">
                <ClockCircleOutlined />
              </Col>
              <Col span={8}>
                <Typography.Text className="TextCommon">
                  {data?.time} Hs
                </Typography.Text>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={14} className="TextCommon">
                <Typography.Text el className="TextResv">
                  Professor(a):
                </Typography.Text>
              </Col>

              <Col span={1} className="TextCommon">
                <ReadOutlined />
              </Col>
              <Col span={8}>
                <Typography.Text ellipsis className="TextCommon">
                  {data?.User?.surname || data?.User?.name}
                </Typography.Text>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={14} className="TextCommon">
                <Typography.Text className="TextResv">
                  Turma:
                </Typography.Text>
              </Col>

              <Col span={1} className="TextCommon">
                <ContactsOutlined />
              </Col>
              <Col span={8}>
                <Typography.Text className="TextCommon">
                  {data?.Class?.grade}º {data?.Class.className}
                </Typography.Text>
              </Col>
            </Row>
          </Col>

        </Card>
      )}
    </>
  )
}

export default CardReservation;