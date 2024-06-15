import { UserContext } from "./context.js";
import { useMemo, useState } from "react";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isLoggedIn = useMemo(() => (user ? true : false), [user]);

  const setLoggedIn = (email, password) => {
    setUser({
      email,
      password,
    });
  };

  const setLoggedOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, setLoggedIn, setLoggedOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
