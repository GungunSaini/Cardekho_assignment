const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// cars with filtering
router.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.query.search) {
      query.$or = [
        { brand: { $regex: req.query.search, $options: "i" } },
        { model: { $regex: req.query.search, $options: "i" } }
      ];
    }
    if (req.query.fuel) query.fuel = req.query.fuel;
    if (req.query.minPrice) query.price = { ...query.price, $gte: +req.query.minPrice };
    if (req.query.maxPrice) query.price = { ...query.price, $lte: +req.query.maxPrice };

    let carsQuery = Car.find(query);

    switch (req.query.sortBy) {
      case "priceAsc":
        carsQuery = carsQuery.sort({ price: 1 });
        break;
      case "priceDesc":
        carsQuery = carsQuery.sort({ price: -1 });
        break;
      case "yearAsc":
        carsQuery = carsQuery.sort({ year: 1 });
        break;
      case "yearDesc":
        carsQuery = carsQuery.sort({ year: -1 });
        break;
    }

    const cars = await carsQuery;
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cars", error: err });
  }
});

// GET particular car
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.json(car);
  } catch (err) {
    res.status(404).json({ message: "Car not found" });
  }
});

// add a car
router.post("/", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.json(savedCar);
  } catch (err) {
    res.status(400).json({ message: "Error saving car", error: err });
  }
});

// update a car
router.put("/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: "Error updating car", error: err });
  }
});

// DELETE a car
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting car", error: err });
  }
});

module.exports = router;
