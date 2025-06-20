import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">CarDekho</Link>
        <div className="ml-auto">
          <Link className="btn btn-outline-light me-2" to="/">Home</Link>
          <Link className="btn btn-outline-light" to="/add">Add Car</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCar />} />
        <Route path="/edit/:id" element={<EditCar />} />
      </Routes>
    </div>
  );
};

export default App;
