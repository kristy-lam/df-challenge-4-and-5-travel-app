import MainLayout from "../components/MainLayout.jsx";
import SearchBar from "../components/SearchBar.jsx";

const HomeSearchSec = () => {
  return (
    <MainLayout>
      <div
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ height: "70vh" }}
      >
        <h1 style={{ textAlign: "center" }}>Tell me about...</h1>
        <br />
        <section className="w-100" style={{ maxWidth: "400px" }}>
          <SearchBar parent="HomeSearchSec" />
        </section>
      </div>
    </MainLayout>
  );
};

export default HomeSearchSec;
