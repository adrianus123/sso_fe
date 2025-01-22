import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import User from "../components/User";
import { useStore } from "../hooks/useStore";
import { AuthURL } from "../hooks/scripts";

const Home = () => {
  const { authEndpoints, setAuthData, setToken, setAuthEndpoints } = useStore();
  const id_token = Cookies.get("id_token");

  useEffect(() => {
    const fetchData = async () => {
      const data = await AuthURL();
      setAuthEndpoints(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (id_token) {
      getUser(id_token);
    }
  }, [id_token]);

  const getUser = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/verify?token=${token}`
      );

      const data = response.data;
      if (data.status == 200) {
        setToken(token);
        setAuthData(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const redirectLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const response_type = "code";
    const scope = "openid email profile";
    const redirect_uri = `${import.meta.env.VITE_API_URL}/callback`;
    const authorizationUrl = `${authEndpoints.authorization_endpoint}?client_id=${clientId}&response_type=${response_type}&scope=${scope}&redirect_uri=${redirect_uri}`;

    window.location.href = authorizationUrl;
  };

  return (
    <div className="container">
      {!useStore((state) => state.token) ? (
        <>
          <h1>Welcome</h1>
          <button onClick={redirectLogin} className="button">
            Login
          </button>
        </>
      ) : (
        <>
          <h1>React x Nestjs Google Sign in</h1>
          <User />
        </>
      )}
    </div>
  );
};

export default Home;
