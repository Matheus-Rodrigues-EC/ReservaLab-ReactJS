import React, {
  useState,
  useEffect,
} from "react";
// import packageJson from '../../package.json';
// import { useNavigate } from "react-router";
import "./Style.less";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
// import styled from "styled-components";
import Logo from '../assets/Logo.jpg';
import { Row, Avatar, Button, Typography } from 'antd';
import { MenuOutlined } from "@ant-design/icons";

const TopMenu = (props) => {
  const { visible, setVisible } = props;
  const [today, setToday] = useState();
  const [user, setUser] = useState('Professor(a)');
  const userData = JSON.parse(localStorage.getItem('userData'));


  const SetDate = () => {
    const dataFormatada = dayjs().format("dddd, DD/MM/YYYY");
    const dataCapitalizada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
    return dataCapitalizada;
  }

  useEffect(() => {
    setToday(SetDate);
    setUser(userData?.surname || userData?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today, user])

  return (
    <Row className="TopMenuNav">

      <Avatar
        className="AvatarTopMenu"
        src={Logo}
      />
      <Typography.Title 
        style={{ 
          display: 'flex', 
          fontFamily: "Poppins, sans-serif", 
          marginTop: '10px', 
          fontSize: '1rem', 
          alignItems: 'center' 
        }}
      >
        {today}
      </Typography.Title>
      <Button
        type="text"
        icon={<MenuOutlined style={{ fontSize: '1.5rem' }} />}
        className="ButtonTopMenu"
        onClick={() => setVisible(!visible)}
      >
      </Button>
    </Row>
  )
}

export default TopMenu;