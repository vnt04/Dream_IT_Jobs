const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dream-it-jobs.a81y6a7.mongodb.net/dream-it-jobs`
    );
    console.log("Connect MongoDB successfully !!!");
  } catch (error) {
    console.log("Connect MongoDB Fail !!!");
  }
}

module.exports = connectDatabase;
