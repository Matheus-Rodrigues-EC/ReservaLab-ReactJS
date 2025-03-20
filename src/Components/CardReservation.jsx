/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
} from "react";
import { Col, Row, Card, Button, Image, Typography } from "antd";
// import { Link } from "react-router";
// import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";

import {
  ClockCircleOutlined,
  ReadOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

import Info from '../assets/Informática.png';
import Sport from '../assets/Quadra.png'
import Libr from '../assets/Biblioteca.png';

const CardReservation = (Data) => {
  const { data } = Data;

  console.log(Data)
  useEffect(() => {
  }, [data])

  return (
    <Card
      className="Reservation"
      bodyStyle={{ display: 'flex' }}
    >

      <Col span={4} >
        <Image
          src={(data?.type) !== 'Info' ? (data?.type === 'Sport' ? Sport : Libr) : Info}
          className="ImageResv"
        />
      </Col>
      <Col span={19} offset={1}>
        <Row>
          <Typography.Title level={2} className="TitleResv">
            {data?.sala} - {data?.disciplina}
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
              {data?.horario} Hs
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
              {data?.name}
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
              {data?.turma}
            </Typography.Text>
          </Col>
        </Row>
      </Col>

    </Card>
  )
}

export default CardReservation;