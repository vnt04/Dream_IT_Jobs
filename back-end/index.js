const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDatabase = require('./config/connectDB')
const route = require('./Routes')
const morgan = require('morgan');

const port = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB
connectDatabase();
route(app);


app.use(morgan('dev'));

app.listen(port, () => {
  console.log(`This app listening on port ${port}`)
})