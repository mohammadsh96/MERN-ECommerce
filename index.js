const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const url = process.env.URL;
const { requireAuth, checkUser } = require('./src/middleware/middleware');

const authRoutes = require("./src/routes/auth");

app.use(express.json());


// database connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT ,()=>{
    console.log(`Server is Running on Port :${PORT} and Database is Connected`);
  }))
  .catch((err) => console.log(err));



// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.send('Welcome To Home Page ❤'));
app.use(authRoutes);