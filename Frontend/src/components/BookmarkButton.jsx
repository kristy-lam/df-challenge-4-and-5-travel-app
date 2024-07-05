import { useEffect, useState } from "react";
import { useUser } from "../context/context.js";
import addFavService from "../services/addFav.service.js";
import deleteFavService from "../services/deleteFav.service.js";

const BookmarkButton = ({ city }) => {
  const { favs, user, updateFavs } = useUser();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const checkIfBookmarked = () => {
    return favs.find((row) => row.city === city);
  };

  const handleBookmarkClick = async () => {
    if (!user) {
      return;
    }
    if (isBookmarked) {
      await deleteFavService(city, user);
      setIsBookmarked(false);
    } else {
      await addFavService(city, user);
      setIsBookmarked(true);
    }
    updateFavs();
  };

  useEffect(() => {
    setIsBookmarked(checkIfBookmarked());
  }, [city, favs]);

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
