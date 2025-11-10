const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studentName: { type: String },
  teacher: { type: String, required: true },
  subject: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
