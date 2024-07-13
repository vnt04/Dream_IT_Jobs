const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  min_salary: {
    type: Number,
    required: true,
  },
  max_salary: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  time_created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  job_type: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    required: true,
  },
  viewed: {
    type: Number,
    default: 0,
  },
  year_exp: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  tech_stack: {
    type: Array,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  requirement: {
    type: String,
    required: true,
  },
  benefit: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Job", JobSchema);
