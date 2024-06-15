import { useState } from "react";
import addFavService from "../services/addFav.service.js";
import deleteFavService from "../services/deleteFav.service.js";
import getAllFavsService from "../services/getAllFavs.service.js";

const BookmarkButton = ({ city }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const fetchAllFavs = async () => {
    try {
      return await getAllFavsService();
    } catch (e) {
      return e.message;
    }
  };

  const checkIfBookmarked = () => {
    const allFavs = fetchAllFavs();
    if (Array.isArray(allFavs)) {
      return allFavs.includes(city);
    }
  };

  const handleBookmarkClick = () => {
    if (checkIfBookmarked()) {
      console.log(checkIfBookmarked());
      console.log(city);
      deleteFavService(city);
      setIsBookmarked(false);
    } else {
      console.log(checkIfBookmarked());
      console.log(city);
      addFavService(city);
      setIsBookmarked(true);
    }
  };

  return (
    <button onClick={handleBookmarkClick} className="bookmark-button">
      {isBookmarked ? "Remove from favourites" : "Click to add to favourites"}
      <img
        src="/assets/bookmark-icon.svg"
        alt="bookmark"
        style={{ width: "15px", height: "18px", marginLeft: "8px" }}
      />
    </button>
  );
};

export default BookmarkButton;
