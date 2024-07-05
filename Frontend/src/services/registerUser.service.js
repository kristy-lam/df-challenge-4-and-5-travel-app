import axios from "axios";

const registerUser = async (email, password) => {
  const user = { email, password };
  return await axios.post(import.meta.env.VITE_APP_REGISTERURL, user);
};

export default registerUser;
