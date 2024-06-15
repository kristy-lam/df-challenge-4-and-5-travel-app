import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout.jsx";

import getAllFavsService from "../services/getAllFavs.service.js";

const FavSec = () => {
  const [favs, setFavs] = useState([]);

  const fetchFavs = async () => {
    try {
      const favData = await getAllFavsService();
      setFavs(favData);
    } catch (e) {
      return e.message;
    }
  };

  useEffect(() => {
    fetchFavs();
  }, []);

  return (
    <MainLayout>
      <div className="container text-center">
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
                    <button className="btn btn-link">
                      <img
                        src="/assets/bookmark-icon.svg"
                        alt="bookmark"
                        style={{ width: "15px", height: "18px" }}
                      />
                    </button>
                    <p className="mb-0">
                      Favourite {index + 1}: {fav.city}
                    </p>
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
