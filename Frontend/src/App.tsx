
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Login  from "./components/Login";
import Signup  from "./components/Signup";
import{ Transaction } from "./components/Transaction";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/transaction"
            element={
              <Suspense fallback={<div>Loading Transaction History...</div>}>
                <Transaction />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App
