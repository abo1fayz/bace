import express from "express";
import Product from "../models/Product.js";
import { ADMIN_PASSWORD } from "../config.js";

const router = express.Router();

// تحقق كلمة مرور المدير
function checkAdmin(req, res, next) {
  const pass = req.headers["authorization"];
  if (pass === ADMIN_PASSWORD) next();
  else res.status(401).json({ message: "Unauthorized" });
}

// جلب كل المنتجات
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// إضافة منتج
router.post("/", checkAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// تعديل منتج
router.put("/:id", checkAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// حذف منتج
router.delete("/:id", checkAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
