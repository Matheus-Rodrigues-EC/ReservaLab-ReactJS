import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Providers/UserData";
import axios from "axios";
import { notification } from "antd";
import Loading from "../Components/Loading";
import { generateStrongPassword } from "../Utils/Constants";

type GoogleJwtPayload = {
  email: string;
  name?: string;
};

const GoogleLoginComponent = () => {
  // const { setUserData } = React.useContext(UserDataContext);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const goToHome = () => {
    navigate("/home");
  };

  const handleSuccess = async (credentialResponse) => {
    setLoading(true);
    const googleUser = jwtDecode<GoogleJwtPayload>(
      credentialResponse?.credential
    );
    const body = {
      email: googleUser?.email,
      password: generateStrongPassword(14),
      google_client_id: credentialResponse.clientId,
    };
    // console.log(credentialResponse);
    localStorage.setItem(
      "googleUser",
      JSON.stringify({
        ...googleUser,
        password: generateStrongPassword(14),
        google_client_id: credentialResponse.clientId,
      })
    );
    await axios
      .get(
        `${import.meta.env.VITE_API_URL}/user/list/email/${googleUser?.email}`
      )
      .then(async () => {
        const loggedUser = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/google/login`,
          body
        );
        const serializableUser = JSON.stringify(loggedUser?.data?.user);
        localStorage.setItem("userData", serializableUser);
        localStorage.setItem("token", loggedUser?.data?.token?.token);
        goToHome();
      })
      .catch((error) => {
        // console.log(error);
        if (error.status === 401) {
          api.error({
            message: "Erro ao fazer Login",
            description:
              error.response?.data?.message ||
              "Ocorreu um erro inesperado. Tente novamente.",
            showProgress: true,
            duration: 2.5,
            placement: "top",
          });
        }
        if (error.status === 404) {
          navigate("/register");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <>
      {contextHolder}
      {loading && <Loading />}
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </>
  );
};

export default GoogleLoginComponent;

// TypeScript: Add type declarations for import.meta.env
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // add other env variables here if needed
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
