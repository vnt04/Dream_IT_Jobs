const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDatabase = require('./config/connectDB')


const port = process.env.PORT || 5000

// middleware
app.use(express.json())
app.use(cors())

//Connect to MongoDB
connectDatabase();

app.listen(port, () => {
  console.log(`This app listening on port ${port}`)
})