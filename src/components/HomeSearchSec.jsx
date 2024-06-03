import SearchBar from "./SearchBar";

const HomeSearchSec = ({
  citySearchInput,
  setCitySearchInput,
  locations,
  isHomePage,
}) => {
  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ height: "70vh" }}
    >
      <h1 style={{ textAlign: "center" }}>Tell me about...</h1>
      <br />
      <section className="w-100" style={{ maxWidth: "400px" }}>
        <SearchBar
          citySearchInput={citySearchInput}
          setCitySearchInput={setCitySearchInput}
          locations={locations}
          isHomePage={isHomePage}
          parent="HomeSearchSec"
        />
      </section>
    </div>
  );
};

export default HomeSearchSec;
