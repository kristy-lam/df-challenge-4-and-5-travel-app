import axios from "axios";

export const deleteFavService = async (city, user) => {
  try {
    const res = await axios.patch(import.meta.env.VITE_APP_DELETEFAVURL, {
      city,
      ...user,
    });
    return res.data;
  } catch (e) {
    return e.message;
  }
};

export default deleteFavService;
