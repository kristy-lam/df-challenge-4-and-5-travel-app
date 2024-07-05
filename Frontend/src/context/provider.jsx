import { UserContext } from "./context.js";
import { useEffect, useMemo, useState } from "react";
import getAllFavsService from "../services/getAllFavs.service.js";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isLoggedIn = useMemo(() => (user ? true : false), [user]);

  const setLoggedIn = (email, password) => {
    const userInfo = { email, password };
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  const setLoggedOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateFavs = async () => {
    if (!user) {
      return;
    }
    try {
      const favs = await getAllFavsService(user);
      setFavs(favs);
      return favs;
    } catch (e) {
      return e.message;
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, setLoggedIn, setLoggedOut, favs, updateFavs }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
