'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Book = require('./models/Book.js');


// app.delete('', )

//USE
app.use(cors());
app.use(express.json());


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
app.post('/books', handlePostBooks);

async function getBooks(req, res) {
  try {
    let results = await Book.find();
    console.log(results);
    if (results.length > 0) {
    res.status(200).send(results);
  } else {
    res.status(404).send(results);
  }
  } catch(err) {
    res.status(500).send('There is a Server Error, Please Try Again');
  }
}

async function handlePostBooks(req, res) {
  console.log('creating a book');
  try {
    const addedBook = await Book.create(req.body);
    res.status(201).send(addedBook);
  }catch (e){
    res.status(500).send('There is a Server Error, Please Try Again');
  }
}

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})


app.listen(PORT, () => console.log(`listening on ${PORT}`));
