/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
} from "react";
import { Col, Row, Card, Image, Typography, Tag } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import "./Style.less";
const userData = JSON.parse(localStorage.getItem('userData'));
import { FuncionalidadesList as Purposes } from "../Utils/Constants";

import {
  ClockCircleOutlined,
  ReadOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

import Classroom from '../assets/Classroom.jpg';
import Computer from '../assets/Informática.png';
import Library from '../assets/Biblioteca.png';
import Recap from '../assets/Reforco.png';
import Special from '../assets/Especial.jpeg';
import Sport from '../assets/Quadra.png'
import Test from '../assets/Prova.png';

const CardReservation = (Data) => {
  const { data } = Data;

  const renderImage = (id) => {
    if (id === '1' || id === '7') return Test;
    else if (id === '2') return Special;
    else if (id === '3') return Sport;
    else if (id === '4') return Library;
    else if (id === '5') return Computer;
    else if (id === '6') return Library;
    else if (id === '8' || id === '9') return Recap;
    else return Classroom;
  }

  const renderPurpose = (id) => {
    const found = Purposes.find((purpose) => purpose.id == id);
    return found ? `${found?.label}` : "Aula Padrão";
  }

  // const actions = [
  //   <EditOutlined key="edit" />,
  //   <SettingOutlined key="setting" />,
  //   <EllipsisOutlined key="ellipsis" />,
  // ];

  useEffect(() => {
    // console.log(data)
  }, [data])

  const formattedDate = dayjs(data.date).format("dddd, DD/MM/YYYY");
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <>
      <Card
        className="Reservation"
        
        styles={ window.innerWidth > 1025 ? { 
          body: { display: 'flex' } } : {
          body: { display: 'flex', flexDirection: 'column', padding: '15px 10px', height: 'auto' }}}
        
        // actions={userData?.id === data?.userId ? actions : null}
      >
        <Col span={window.innerWidth > 1025 ? 4 : 20} style={ window.innerWidth > 1025 ? {margin: 0} : {margin: 'auto'}}>
          <Image
            src={renderImage(data?.purpose) || Classroom}
            className="ImageResv"
          />
        </Col>
        <Col span={window.innerWidth > 1025 ? 19 : 24} offset={1} >
          <Row>
            <Typography.Text  className="TitleResv">
              {data?.Classroom?.name} | {renderPurpose(data?.purpose)} | {capitalizedDate}
            </Typography.Text>
          </Row>
          <Row justify="space-between">
            <Col span={window.innerWidth > 1025 ? 14 : 12} className="TextCommon">
              <Typography.Text className="TextResv">
                Horário(s):
              </Typography.Text>
            </Col>

            <Col 
              span={window.innerWidth > 1025 ? 8 : 12}
              style={{display: 'flex', justifyContent: 'space-between'}}
            >
            <div>
              <ClockCircleOutlined />
            </div>
            <div style={{ textAlign: 'end', gap:'10px'}}>
              <Typography.Text className="TextCommon">
                {data?.time?.slice().sort().map((time) => {
                  return(
                    <Tag
                      color="blue"
                      key={time}
                      style={
                        window.innerWidth > 1025 ? {
                        fontSize: 16
                      } : {
                        fontSize: 10,
                        padding: 5
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
            <Col span={window.innerWidth > 1025 ? 14 : 12} className="TextCommon">
              <Typography.Text ellipsis  className="TextResv">
                Professor(a):
              </Typography.Text>
            </Col>

            <Col 
              span={window.innerWidth > 1025 ? 8 : 12}
              style={{ display: 'flex', justifyContent: 'end'}}
            >
              <ReadOutlined />
              <Typography.Text ellipsis className="TextCommon" style={{ textAlign: 'end', marginRight: '2.5vw'}}>
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
              span={window.innerWidth > 1025 ? 8 : 12}
              style={{ display: 'flex', justifyContent: 'end'}}
            >
              <ContactsOutlined />
              <Typography.Text className="TextCommon" style={{ textAlign: 'end', marginRight: '2.5vw'}}>
                {data?.Class?.grade}º {data?.Class.className} - {data?.Class?.shift}
              </Typography.Text>
            </Col>
          </Row>
          {data?.description && (
            <Row justify="space-between">
              <Col span={2} className="TextCommon">
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