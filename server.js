'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Book = require('./models/Book.js');

//USE
app.use(cors());


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected')
});

async function connectMongoose() {
  mongoose.connect(process.env.DB_URL)
}
connectMongoose();

// add validation to confirm we are wired up to our mongo DB
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('Mongoose is connected');
// });

// ROUTES

app.get('/books', getBooks);

async function getBooks(req, res, next) {
  try {
    let results = await Book.find();
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
};


const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})


app.listen(PORT, () => console.log(`listening on ${PORT}`));

// async function seed() {
//   mongoose.connect(process.env.DB_URL)

//   const db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'connection error'));
//   db.once('open', function () {
//     console.log('Mongoose is connected playa')
//   });
