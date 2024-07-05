import { createContext, useContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  user: null,
  setLoggedIn: () => {},
  setLoggedOut: () => {},
  favs: [],
  updateFavs: () => {},
});

export const useUser = () => useContext(UserContext);
