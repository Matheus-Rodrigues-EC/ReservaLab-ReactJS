/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
} from "react";
import { Col, Row, Card, Image, Typography } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import "./Style.less";
const userData = JSON.parse(localStorage.getItem('userData'));
import { FuncionalidadesList as Purposes } from "../Utils/Constants";

import {
  ClockCircleOutlined,
  ReadOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

import Computer from '../assets/Informática.png';
import Sport from '../assets/Quadra.png'
import Library from '../assets/Biblioteca.png';
import Test from '../assets/Prova.png';
import Recap from '../assets/Reforco.png';
import classroom from '../assets/Classroom.jpg';

const CardReservation = (Data) => {
  const { data } = Data;

  const renderImage = (id) => {
    if (id === '1') return Test;
    else if (id === '4') return Sport;
    else if (id === '5') return Library;
    else if (id === '6') return Computer;
    else if (id === '7') return Library;
    else if (id === '8' || id === '9') return Recap;
    else return classroom;
  }

  const renderPurpose = (id) => {
    const found = Purposes.find((purpose) => purpose.id == id);
    return found ? ` - ${found?.label}` : " - Aula Padrão";
  }

  // const actions = [
  //   <EditOutlined key="edit" />,
  //   <SettingOutlined key="setting" />,
  //   <EllipsisOutlined key="ellipsis" />,
  // ];

  useEffect(() => {
    // console.log(data)
  }, [data])

  return (
    <>
      <Card
        className="Reservation"
        bodyStyle={{ display: 'flex' }}
        
        // actions={userData?.id === data?.userId ? actions : null}
      >
        <Col span={4} >
          <Image
            src={renderImage(data?.purpose) || classroom}
            className="3"
          />
        </Col>
        <Col span={19} offset={1}>
          <Row>
            <Typography.Title style={{ fontSize: '2.25vw' }} className="TitleResv">
              {data?.Classroom?.name} - {data?.User?.subject}{renderPurpose(data?.purpose)}
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
                {data?.Class?.grade}º {data?.Class.className} - {data?.Class?.shift}
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

export default CardReservation;