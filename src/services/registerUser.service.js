import axios from "axios";

const registerUser = async (email, password) => {
  const user = { email, password };
  // import.meta.env.VITE_APP_LOGINURL;
  return await axios.post("http://localhost:4000/register", user);
};

export default registerUser;
