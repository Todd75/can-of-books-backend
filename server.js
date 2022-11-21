'use strict';
const mongoose = require('mongoose');

require('dotenv').config();
const express = require('express');
const cors = require('cors');

//use mongoose
const mongoose = require('mongoose');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// ROUTES

app.get('/books', (req, res) => {
  res.send('connected to books server');
});

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})
async function mongoose() {
  mongoose.conect(process.env.DB_URL)
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));

// async function seed() {
//   mongoose.connect(process.env.DB_URL)

//   const db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'connection error'));
//   db.once('open', function () {
//     console.log('Mongoose is connected playa')
//   });