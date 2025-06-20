import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

const EditCar = () => {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    fuel: "",
    price: "",
    year: "",
    description: "",
    imageUrl: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/cars/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.log("Failed to fetch car details", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/cars/${id}`, form);
      navigate("/");
    } catch (err) {
      console.error("Error updating car:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Edit Car Details</h3>
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
          <button type="submit" className="btn btn-primary px-5">
            Update Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCar;
