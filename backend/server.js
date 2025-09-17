import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URI } from "./config.js";
import productRoutes from "./routes/products.js";
const app = express();
// app.use("/prodact",express.static("public"));



import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/prodact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});



const PORT = 5000;

app.use(cors());
app.use(express.json());



// وصل الراوت
app.use("/api/products", productRoutes);

// ربط MongoDB
mongoose.connect("mongodb+srv://GM-MOHAMED:Sqdl0o6aZgGE2DmA@cluster0.ljrua7h.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
