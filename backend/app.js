require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user.route");
const orgRoutes = require("./routes/org.route");
const locationRoutes = require("./routes/location.route");
const bloodRoutes = require("./routes/blood.route");

const app = express();

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Mongo Error", err));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Allow frontend access
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ 👇 ADD THIS BLOCK *immediately after* cors()
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cookieParser());

// ✅ Test Route
app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

// ✅ Routes
app.use("/user", userRoutes);
app.use("/org", orgRoutes);
app.use("/location", locationRoutes);
app.use("/bloodServices", bloodRoutes);

module.exports = app;
