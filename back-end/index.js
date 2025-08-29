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
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.CLIENT_URL,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
