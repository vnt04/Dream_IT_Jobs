const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mst: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  banner: {
    type: String,
  },
  model: {
    type: String,
  },
  scale: {
    type: Number,
    default: 1,
  },
  work_time: {
    type: String,
  },
  over_time: {
    type: String,
  },
  tech_stack: [String],
  address: [String],
  location: [String],
  field: {
    type: String,
  },
  follow: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
  },
  benefit: {
    type: String,
  },
  website: {
    type: String,
  },
  nation: {
    type: String,
  },
  review_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
});

module.exports = mongoose.model("Company", companySchema);
