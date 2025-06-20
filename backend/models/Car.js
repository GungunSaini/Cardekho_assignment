const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  fuel: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric"],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Car", carSchema);
