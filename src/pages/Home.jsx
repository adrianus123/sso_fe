import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import User from "../components/User";
import { useStore } from "../hooks/useStore";

const Home = () => {
  const setAuthData = useStore(state => state.setAuthData)
  const token = Cookies.get("access_token");

  useEffect(() => {   
    if (token) {
      getUser(token);
    }
  }, [token]);

  const getUser = async (access_token) => {
    const data = await axios.get(
      `${import.meta.env.VITE_OPENID_CONNECT_URL}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    setAuthData(data.data);
  };

  const redirectLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const response_type = "code";
    const scope = "openid email profile";
    const redirect_uri = `${import.meta.env.VITE_API_URL}/callback`;
    const authorizationUrl = `${
      import.meta.env.VITE_AUTHORIZATION_URL
    }?client_id=${clientId}&response_type=${response_type}&scope=${scope}&redirect_uri=${redirect_uri}`;

    window.location.href = authorizationUrl;
  };
  
  return (
    <div className="container">
      {!useStore(state => state.authData) ? (
        <>
          <h1>Unauthorized</h1>
          <button onClick={redirectLogin} className="button">
            Login
          </button>
        </>
      ) : (
        <User />
      )}
    </div>
  );
};

export default Home;
