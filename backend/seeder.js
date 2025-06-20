const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Car = require("./models/Car"); // Adjust path as needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const cars = [
  {
    brand: "Hyundai",
    model: "Creta",
    year: 2022,
    fuel: "Petrol",
    price: 1200000,
    imageUrl: "https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fbig%2Fhyundai%2Fcreta%2Fhyundai-creta.jpg%3Fv%3D92&w=3840&q=75",
    description: "A stylish and comfortable SUV perfect for city and highway driving.",
  },
  {
    brand: "Maruti Suzuki",
    model: "Swift",
    year: 2021,
    fuel: "Petrol",
    price: 750000,
    imageUrl: "https://www.financialexpress.com/wp-content/uploads/2023/01/Maruti-Suzuki-Fronx-3.jpg",
    description: "A compact hatchback with excellent mileage and smooth performance.",
  },
  {
    brand: "Tata",
    model: "Harrier",
    year: 2023,
    fuel: "Diesel",
    price: 1700000,
    imageUrl: "https://spn-sta.spinny.com/blog/20220228140845/Tata-Harrier-Black-Edition.jpg",
    description: "A powerful diesel SUV with premium features and bold design.",
  },
    {
    brand: "Honda",
    model: "City",
    year: 2022,
    fuel: "Petrol",
    price: 1200000,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Honda_Civic_e-HEV_Sport_%28XI%29_%E2%80%93_f_30062024.jpg/960px-Honda_Civic_e-HEV_Sport_%28XI%29_%E2%80%93_f_30062024.jpg",
    description: "Refined sedan known for comfort and reliability."
  },
    {
    brand: "Toyota",
    model: "Innova Hycross",
    year: 2024,
    fuel: "Hybrid",
    price: 2200000,
    imageUrl: "https://auto.hindustantimes.com/cms-images/toyota_fortuner/images/exterior_toyota-fortuner_front-left-view_1200x617.jpg?imwidth=420",
    description: "Luxury MPV with hybrid engine and ample space."
  },
   {
    brand: "Mahindra",
    model: "XUV700",
    year: 2023,
    fuel: "Diesel",
    price: 1800000,
    imageUrl: "https://img.gaadicdn.com/images/car-images/large/Mahindra/Thar/10745/1692257137907/223_Deep-Grey_333536.jpg",
    description: "Powerful SUV with advanced ADAS and panoramic sunroof."
  },
];

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB connected");

    await Car.deleteMany();
    console.log("Old data removed");

    await Car.insertMany(cars);
    console.log("New car data inserted");

    process.exit();
  })
  .catch((err) => {
    console.error("Mongo error:", err);
    process.exit(1);
  });
