import React from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Login  from "./components/Login";
import Signup  from "./components/Signup";
import { Home}  from "./components/home";

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </Router>

  )
}

export default App
