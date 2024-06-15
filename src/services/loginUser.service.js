import axios from "axios";

const loginUser = async (email, password) => {
  // import.meta.env.VITE_APP_LOGINURL;
  const user = { email, password };
  return await axios.post("http://localhost:4000/login", user);
};

export default loginUser;
