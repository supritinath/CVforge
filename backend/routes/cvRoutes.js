const express = require("express");

const {
  createCV,
  getMyCVs,
  getCV,
  updateCV,
  deleteCV,
} = require("../controllers/cvController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create CV
router.post("/", protect, createCV);

// Get all logged-in user's CVs
router.get("/", protect, getMyCVs);

// Get single CV
router.get("/:id", protect, getCV);

// Update CV
router.put("/:id", protect, updateCV);

// Delete CV
router.delete("/:id", protect, deleteCV);

module.exports = router;
