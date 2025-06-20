// CarCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car, onDelete }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={car.imageUrl}
          className="card-img-top"
          alt={car.model}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{car.brand} {car.model}</h5>
          <p className="card-text">Fuel: {car.fuel}</p>
          <p className="card-text">Price: ₹{car.price}</p>
          <p className="card-text">Year: {car.year}</p>
          <p className="card-text">{car.description}</p>
          <div className="d-flex justify-content-between mt-3">
            <Link to={`/edit/${car._id}`} className="btn btn-sm btn-primary">
              Edit
            </Link>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(car._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
