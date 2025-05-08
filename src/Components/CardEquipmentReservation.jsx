/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
} from "react";
import { Col, Row, Card, Image, Typography, Tag } from "antd";
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import "./Style.less";
const userData = JSON.parse(localStorage.getItem('userData'));
import { FuncionalidadesList as Purposes } from "../Utils/Constants";

import {
  ClockCircleOutlined,
  ReadOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

import Infra from '../assets/Infrastructure.png';
import Music from '../assets/Music.png';
import Audio from '../assets/Som.png';
import Sport from '../assets/Sports.png';
import Video from '../assets/Video.png';

const CardEquipmentReservation = (Data) => {
  const { data } = Data;

  const renderImage = (id) => {
    if (id === 'Audio') return Audio;
    else if (id === 'Vídeo') return Video;
    else if (id === 'Infraestrutura') return Infra;
    else if (id === 'Esportes') return Sport;
    else if (id === 'Música') return Music;
  }

  // const actions = [
  //   <EditOutlined key="edit" />,
  //   <SettingOutlined key="setting" />,
  //   <EllipsisOutlined key="ellipsis" />,
  // ];

  useEffect(() => {
    // console.log(data)
  }, [data])

  console.log(data)

  const formattedDate = dayjs(data.date).format("dddd, DD/MM/YYYY");
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <>
      <Card
        className="Reservation"

        styles={window.innerWidth > 1025 ? {
          body: { display: 'flex' }
        } : window.innerWidth > 415 ? {
          body: { display: 'flex', flexDirection: 'row', padding: '15px 10px', height: 'auto' }
        } : {
          body: { display: 'flex', flexDirection: 'column', padding: '15px 10px', height: 'auto' }
        }}

      // actions={userData?.id === data?.userId ? actions : null}
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
              <div style={{ display: 'flex'}}>
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