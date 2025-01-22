import axios from "axios";

export const AuthURL = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_WELL_KNOWN_ENDPOINTS}`,
      {
        headers: "application/json",
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};