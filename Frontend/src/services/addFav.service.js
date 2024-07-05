import axios from "axios";

export const addFavService = async (city, user) => {
  try {
    const res = await axios.patch(import.meta.env.VITE_APP_ADDFAVURL, {
      city,
      ...user,
    });
    return res.data;
  } catch (e) {
    return e.message;
  }
};

export default addFavService;
