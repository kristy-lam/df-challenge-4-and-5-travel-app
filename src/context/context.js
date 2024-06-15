import { createContext, useContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  user: null,
  setLoggedIn: () => {},
  setLoggedOut: () => {},
});

export const useUser = () => useContext(UserContext);
