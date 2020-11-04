const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const JobSchema = new Schema({
  role: { 
    enum: ["Frontend", "Backend", "Full Stack", "Intern"],
    default: "Frontend",
    required: true
  },
  level: {
    enum: ["Fresher", "Junior", "Midweight", "Senior"],
    default: "Fresher",
    required: true
  },
  contract: {
    enum: ["FullTime", "PartTime", "Contract"],
    default: "FullTime",
    required: true
  },
  jobOverview: { type: String, required: true },
  language: [
    { name: { type: String, required: true } }
  ],
  tools: [
    { name: { type: String, required: true } }
  ],
  featured: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("Job", JobSchema);