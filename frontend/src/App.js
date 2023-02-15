import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
// import Navbar from "./components/Navbar";
// import { ReactNavbar } from "react-responsive-animate-navbar";
function App() {
  return (
    <div className="App" style={{fontFamily: "Comfortaa"}}>
      <BrowserRouter>
        {/* <Navbar2 /> */}
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
