import Footer from "./Footer";
import HomeSearchBox from "./HomeSearchBox";
import NavBar from "./NavBar";

import "./App.css";

const App = () => {
    return <div className="bg d-flex flex-column min-vh-100">
        <NavBar />
        <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
            <HomeSearchBox />
        </div>        
        <Footer />
    </div>;
};

export default App;
