const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDatabase = require("./config/connectDB");
const route = require("./Routes");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./Middleware/errorMiddleware");

const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB
connectDatabase();
route(app);

app.use(morgan("dev"));

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`This app listening on port ${port}`);
});
