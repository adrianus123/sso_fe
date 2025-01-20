// import { googleLogout } from "@react-oauth/google";
import { useStore } from "../hooks/useStore";
import Cookies from "js-cookie";

const User = () => {
  const { authData, setAuthData } = useStore();
  
  return (
    <div className="container">
      <h1>{authData.data.name}</h1>
      <p>{authData.data.email}</p>
      <img src={authData.data.image} alt="profile" />

      <div>
        <button
          onClick={() => {
            Cookies.remove("access_token");
            Cookies.remove("id_token");
            setAuthData(null)
            window.location.reload();
          }}
          className="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default User;
