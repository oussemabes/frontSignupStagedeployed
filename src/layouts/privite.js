import "boosted/dist/css/boosted.css";
import "boosted/dist/js/boosted";

import { Route, Routes } from "react-router-dom";
import Home from '../components/home';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";

import React from "react";
function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userId, setUserId] = React.useState(0);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      const user = jwtDecode(token);
 

      if (!user) {
        localStorage.removeItem("token");
      } else {
        setUserId(user.id);
        setIsAuthenticated(!isAuthenticated);
      }
    }
  }, []);
  return (
    <>

<Navbar isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/" element={<Home/>} />
        



      </Routes>
      <Footer />

    </>
  );
}

export default App;
