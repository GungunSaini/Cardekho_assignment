import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const AddCar = () => {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    fuel: "Petrol",
    price: "",
    year: "",
    description: "",
    imageUrl: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/cars", form);
      navigate("/");
    } catch (err) {
      console.error("Error adding car:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Add New Car</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Model"
            name="model"
            value={form.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            name="fuel"
            value={form.fuel}
            onChange={handleChange}
            required
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Year"
            name="year"
            value={form.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-success px-5">
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
