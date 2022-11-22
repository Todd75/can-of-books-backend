'use strict';
// book module
// define schema

// Example schema
// Book = {
//   title: null,
//   description: null ,
//   status: null
// };

const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema ({
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true}
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
