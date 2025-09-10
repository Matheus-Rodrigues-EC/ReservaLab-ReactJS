import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loading = ({ tip = "Carregando..." }) => (
  <LoadingContainer>
    <Spin size="large" tip={tip} indicator={<LoadingOutlined spin />} fullscreen />
  </LoadingContainer>
);

export default Loading;