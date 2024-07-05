import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeSearchSec from "../pages/HomeSearchSec.jsx";
import TellMeAboutSec from "../pages/TellMeAboutSec.jsx";
import FavSec from "../pages/FavSec.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeSearchSec />} />
        <Route path="/location/:keyword" element={<TellMeAboutSec />} />
        <Route path="/fav" element={<FavSec />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
