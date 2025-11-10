const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const { protect, admin } = require("../middleware/authMiddleware");

// Create feedback (student)
router.post("/", protect, async (req, res) => {
  try {
    const { teacher, subject, rating, comment } = req.body;
    if (!teacher || !subject || !rating) return res.status(400).json({ message: "teacher, subject, rating required" });

    const fb = await Feedback.create({
      student: req.user._id,
      studentName: req.user.name,
      teacher,
      subject,
      rating,
      comment
    });

    res.status(201).json(fb);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all feedbacks (admin)
router.get("/", protect, admin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("student", "name email").sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get feedbacks for current student
router.get("/my", protect, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
