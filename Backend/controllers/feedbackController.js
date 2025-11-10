// controllers/feedbackController.js
const Feedback = require("../models/Feedback"); // your Feedback model

// Get all feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create new feedback
const createFeedback = async (req, res) => {
  const { studentName, teacherName, rating, comment } = req.body;

  if (!studentName || !teacherName || !rating) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const feedback = await Feedback.create({ studentName, teacherName, rating, comment });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getFeedbacks, createFeedback };
