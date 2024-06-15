import axios from "axios";

export const deleteFavService = async (user, city) => {
  try {
    // import.meta.env.VITE_APP_FAVURL;
    const res = await axios.patch("http://localhost:4000/deletefav", {
      ...user,
      city,
    });
    return res.data;
  } catch (e) {
    return e.message;
  }
};

export default deleteFavService;
