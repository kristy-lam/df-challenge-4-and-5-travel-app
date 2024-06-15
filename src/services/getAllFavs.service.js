import axios from "axios";

export const getAllFavsService = async (user) => {
  try {
    // import.meta.env.VITE_APP_FAVURL;
    const res = await axios.post("http://localhost:4000/fav", user);
    return res.data;
  } catch (e) {
    return e.message;
  }
};

export default getAllFavsService;
