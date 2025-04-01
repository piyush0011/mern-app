import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js"; // Import User model

dotenv.config();
const PORT = process.env.PORT || 5050;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

const app = express();

// Allow frontend to access API
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// API to get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from DB
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// API to save a new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(200).json(newUser); // Send saved user back
  } catch (error) {
    res.status(500).json({ message: "Error saving user" });
  }
});

// API to delete user
app.delete("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User deleted", deletedUser });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
