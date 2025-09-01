import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Providers/UserData";
import axios from "axios";

type GoogleJwtPayload = {
  email: string;
  name?: string;
};

const GoogleLoginComponent = () => {
  // const { setUserData } = React.useContext(UserDataContext);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  const handleSuccess = async (credentialResponse) => {
    const googleUser = jwtDecode<GoogleJwtPayload>(
      credentialResponse?.credential
    );
    const body = {
      email: googleUser?.email,
      password: "G" + credentialResponse.clientId,
    };
    // console.log(credentialResponse);
    localStorage.setItem(
      "googleUser",
      JSON.stringify({
        ...googleUser,
        password: "G" + credentialResponse.clientId,
      })
    );
    await axios.get(
        `${import.meta.env.VITE_API_URL}/user/list/email/${googleUser?.email}`
      )
      .then(async () => {
        const loggedUser = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/google/login`,
          body
        );
        const serializableUser = JSON.stringify(loggedUser);
        localStorage.setItem("userData", serializableUser);
        localStorage.setItem("token", loggedUser?.data?.token?.token);
        goToHome();
      })
      .catch(() => {
        navigate("/register");
      });
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
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
