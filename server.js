const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const User = require("./models/User");



// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});




// Simple route OK
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/vma", async (req, res) => {
    res.send("VMA is running...");
});

app.get("/events", async (req, res) => {
    res.send("Events is running...");
});

app.post("/protected", async (req, res) => {
  const protected = new User(req.body);
  await protected.save();
  res.json(protected);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});