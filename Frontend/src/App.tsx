import React from "react";

import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Login  from "./components/Login";
import Signup  from "./components/Signup";
import { Home } from "./components/Home";

function App() {
  

  return (
          <div>
          <Router>
              <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
              </Routes>
          </Router>
        </div>
  )
}

export default App
