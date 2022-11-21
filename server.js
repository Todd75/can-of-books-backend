'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

//use mongoose
const mongoose = require('mongoose');
const { Book } = mongoose;

const bookSchema = new Book ({
  title: String,
  description: String,
  status: String
});

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
