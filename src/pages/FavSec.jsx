import MainLayout from "../components/MainLayout.jsx";
import { useEffect } from "react";
import { useUser } from "../context/context.js";
import { useNavigate } from "react-router-dom";

import deleteFavService from "../services/deleteFav.service.js";

const FavSec = () => {
  const { user, isLoggedIn, favs, updateFavs } = useUser();
  const navigate = useNavigate();

  const handleOnClick = (city) => {
    navigate(`/location/${encodeURIComponent(city.trim())}`);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const deleteFav = async (city) => {
    await deleteFavService(city, user);
    updateFavs();
  };

  return (
    <MainLayout>
      <div className="container text-center opagueDisplay">
        <h2>Telling you about...</h2>
        <h1>Your Favourite Locations</h1>
        <p>
          Click
          <img
            src="/assets/bookmark-icon.svg"
            alt="bookmark"
            style={{
              width: "15px",
              height: "18px",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          />
          button to remove location from favourites
        </p>
        <p>Click name to view info</p>
        <hr />
        <div className="container text-center">
          <div className="row">
            {favs.length > 0 ? (
              favs.map((fav, index) => (
                <div className="col-12 col-md-6 col-lg-4 mb-3" key={index}>
                  <div>
                    <button
                      className="btn btn-link"
                      onClick={() => {
                        deleteFav(fav.city);
                      }}
                    >
                      <img
                        src="/assets/bookmark-icon.svg"
                        alt="bookmark"
                        style={{ width: "15px", height: "18px" }}
                      />
                    </button>

                    <button
                      className="mb-0 btn"
                      onClick={() => handleOnClick(fav.city)}
                    >
                      Favourite {index + 1}: {fav.city}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h3 style={{ color: "#2EC4B6" }}>No favourites at the moment.</h3>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FavSec;
