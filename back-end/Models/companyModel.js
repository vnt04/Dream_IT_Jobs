const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: [String],
  logo: {
    type: String,
    required: true,
  },
  slogan: {
    type: String,
  },
  address: [String],
  location: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  follow: {
    type: Number,
    required: true,
  },
  jobs: [String],
  description: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  nation: {
    type: String,
  },
  created_by: {
    type: String,
    default: "667e6bef9fd78a13de46b6e2",
  },
});

module.exports = mongoose.model("Company", companySchema);
