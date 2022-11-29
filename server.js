'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Book = require('./models/Book.js');
const verifyUser = require('./auth.js');

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
app.delete('/books/:id', handleDeleteBooks);
app.put('/books/:id', putBooks);

verifyUser(req, async (err, user) => {
  if (err) {
    console.log(err);
    res.send('Invalid Token');
  } else {
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
});
}

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

async function handleDeleteBooks(req, res) {
  console.log('Deleting a Book');
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send('Book has been Deleted');
  } catch (err) {
    res.status(500).send('Unable to Delete: Server Error');
  }
}

async function putBooks(req, res, next) {
  try {
    let id = req.params.id;
    let updatedBooksData = req.body;

    let updatedBooks = await Book.findByIdAndUpdate(id, updatedBooksData, {new: true, overwrites: true});
    res.status(200).send(updatedBooks);

  } catch(error) {
    next(error);
  }
}

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})


app.listen(PORT, () => console.log(`listening on ${PORT}`));
