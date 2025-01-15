import { googleLogout } from "@react-oauth/google";
import { useStore } from "../hooks/useStore";

const User = () => {
  const { authData, setAuthData } = useStore();

  return (
    <div className="container">
      {authData && (
        <>
          <h1>{authData.data.name}</h1>
          <p>{authData.data.email}</p>
          <img src={authData.data.image} alt="profile" />

          <div>
            <button
              onClick={() => {
                googleLogout();
                localStorage.removeItem("AuthData");
                setAuthData(null);
                window.location.reload();
              }}
              className="button"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
