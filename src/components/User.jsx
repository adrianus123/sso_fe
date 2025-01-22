import axios from "axios";
import { useStore } from "../hooks/useStore";
import Cookies from "js-cookie";

const User = () => {
  const { authData, setAuthData, token, setToken } = useStore();

  const logout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.data

      if (data.status == 204) {
        Cookies.remove("access_token");
        Cookies.remove("id_token");
        setAuthData(null);
        setToken(null);
        window.location.reload();
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="container">
      <h1>{authData.data.name}</h1>
      <p>{authData.data.email}</p>
      <img src={authData.data.image} alt="profile" />

      <div>
        <button
          onClick={logout}
          className="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default User;
