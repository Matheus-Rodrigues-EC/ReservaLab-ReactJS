import React, {
  // useState, 
  useEffect,
  // useRef 
} from "react";
import { Col, Row, Card, List, Button } from "antd";
// import { Link } from "react-router";
import * as Constants from '../../Utils/Constants';
import styled from "styled-components";
import "./Style.less";
// import Logo from '../../assets/Logo.jpg';

import SideMenu from "../../Components/SideMenu";

const Home = () => {

  const data = Constants.data;

  useEffect(() => {

  }, [])

  return (

    <Container>
      <Col span={4}>
        <SideMenu />
      </Col>
      <Col span={20}>
        <div className="Container">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Card>
                  {item.title}
                  <Button onClick={() => alert(item)}></Button>
                </Card>
                  
              </List.Item>
            )}
          />
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