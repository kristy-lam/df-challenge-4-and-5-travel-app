import axios from "axios";

const loginUser = async (email, password) => {
  const user = { email, password };
  return await axios.post(import.meta.env.VITE_APP_LOGINURL, user);
};

export default loginUser;
