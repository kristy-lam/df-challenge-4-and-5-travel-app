import "./App.css";
import Router from "./containers/Router.jsx";
import UserProvider from "./context/provider.jsx";

const App = () => {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
};

export default App;
