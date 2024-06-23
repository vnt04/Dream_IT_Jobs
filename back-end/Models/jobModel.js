const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  salary_range: {
    type: Object,
    required: true,
    properties: {
      min_salary: {
        type: Number,
        required: true,
      },
      max_salary: {
        type: Number,
        required: true,
      },
    },
  },
  tag: {
    type: [String],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type:String,
    required: true
  },
  img: {
    type: String,
    required: true,
    default: "./src/assets/jobs-img/job-df",
  },
  time_created: {
    type: Date,
    required: true,
  },
  type_job: {
    type: String,
  },
  contract: {
    type: String,
  },
  viewed: {
    type: Number,
  },
  year_exp:{
    type: String,
  },
  level: {
    type: Array
  },
  tech_stack:{
    type:Array
  }
});

module.exports = mongoose.model("Job", JobSchema);
