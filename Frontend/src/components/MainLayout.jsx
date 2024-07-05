import Footer from "./Footer.jsx";
import NavBar from "./NavBar.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    let pageTitle = "DF Travel - Home";
    if (pathname.startsWith("/location"))
      pageTitle = "DF Travel - Tell Me About...";
    if (pathname.startsWith("/fav"))
      pageTitle = "DF Travel - My Saved Locations";
    document.title = pageTitle;
  }, [pathname]);

  return (
    <div className="main-content">
      <div className="bg-all d-flex flex-column min-vh-100">
        <NavBar setIsLoggedIn={() => {}} setIsRegistered={() => {}} />
        <main className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
