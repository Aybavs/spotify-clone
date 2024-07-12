import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "../routes/user.js";

// ES modüllerinde __dirname benzeri işlevselliği elde etmek için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env dosyasının tam yolunu belirtin
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging için
console.log("MONGODB_URI:", process.env.MONGODB_URI); // Debugging için

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("MongoDB URI is not defined. Please check your .env file.");
  process.exit(1);
}

app.use(express.json()); // JSON gövdelerini ayrıştırmak için middleware

app.use("/api/users", userRoutes);

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });
