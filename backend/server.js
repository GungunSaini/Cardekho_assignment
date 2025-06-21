const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// Routes
const carRoutes = require("./routes/carRoutes");
app.use("/api/cars", carRoutes);

app.get("/", (req, res) => {
  res.send("CarDekho Clone API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));