import axios from "axios";

const loginUser = async (email, password) => {
  const user = { email, password };
  try {
    // import.meta.env.VITE_APP_LOGINURL;
    const res = await axios.post("http://localhost:4000/login", user);
    return res.data;
  } catch (e) {
    return e.message;
  }
};

export default loginUser;
