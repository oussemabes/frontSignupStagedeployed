import "boosted/dist/css/boosted.css";
import "boosted/dist/js/boosted";

import { Route, Routes } from "react-router-dom";
import Signuppage from './components/signup';
import Thanks from './components/thankspage';
import { useNavigate } from "react-router-dom";
import React from "react";
function App() {

  return (
    <>


      <Routes>

        <Route path="/" element={<Signuppage />} />
        <Route path="/thanks" element={<Thanks />} />
        



      </Routes>
    </>
  );
}

export default App;
