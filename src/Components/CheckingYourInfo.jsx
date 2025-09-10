import React, { useState } from "react";
import { notification } from "antd";

const CheckingYourInfo = () => {
  const [api, contextHolder] = notification.useNotification();
  const [userData] = useState(JSON.parse(localStorage.getItem("userData")));

  const checkRulets = () => {
    if (userData?.rulets === null || userData?.rulets === undefined) {
      api.info({
        message: 'Atenção',
        description: 'Seu cadastro ainda está incompleto. Por favor, preencha os dados do seu cargo.',
        duration: 2,
        placement: "top",
        showProgress: true,
      });
    }
  }

  const checkShift = () => {
    if (userData?.shift === null || userData?.shift === undefined) {
      api.info({
        message: 'Atenção',
        description: 'Seu cadastro ainda está incompleto. Por favor, preencha os dados do seu turno.',
        duration: 2,
        placement: "top",
        showProgress: true,
      });
    }
  }

  const checkSubject = () => {
    if (userData?.subject === null || userData?.subject === undefined) {
      api.info({
        message: 'Atenção',
        description: 'Seu cadastro ainda está incompleto. Por favor, preencha os dados da sua disciplina.',
        duration: 2,
        placement: "top",
        showProgress: true,
      });
    }
  }

  React.useEffect(() => {
    checkRulets();
    checkShift();
    checkSubject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {contextHolder}
    </>
  );
};

export default CheckingYourInfo;

