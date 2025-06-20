import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [fuel, setFuel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (fuel) params.fuel = fuel;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (sortBy) params.sortBy = sortBy;

      const res = await API.get("/cars", { params });
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCar = async (id) => {
    try {
      await API.delete(`/cars/${id}`);
      fetchCars();
    } catch (err) {
      console.error("Failed to delete car", err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [search, fuel, minPrice, maxPrice, sortBy]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Cars</h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by brand or model"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-control"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
          >
            <option value="">All Fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="yearAsc">Year: Old to New</option>
            <option value="yearDesc">Year: New to Old</option>
          </select>
        </div>
      </div>

      <div className="row">
        {cars.length === 0 ? (
          <p className="text-center">No cars available.</p>
        ) : (
          cars.map((car) => (
            <div className="col-md-4 mb-4" key={car._id}>
              <div className="card h-100">
                <img
                  src={car.imageUrl}
                  className="card-img-top"
                  alt={car.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{car.brand} {car.model}</h5>
                  <p className="card-text">Fuel: {car.fuel}</p>
                  <p className="card-text">Year: {car.year}</p>
                  <p className="card-text">Price: ₹{car.price}</p>
                  <p className="card-text">{car.description}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/edit/${car._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteCar(car._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
