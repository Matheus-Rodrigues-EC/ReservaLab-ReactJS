// pages/NotFound.tsx
import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, a página que você tentou acessar não existe."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Voltar para o Login
        </Button>
      }
    />
  );
};

export default NotFound;
