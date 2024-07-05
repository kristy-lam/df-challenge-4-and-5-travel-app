import axios from "axios";

export const getAllFavsService = async (user) => {
  const res = await axios.post(import.meta.env.VITE_APP_FAVURL, user);
  return res.data;
};

export default getAllFavsService;
