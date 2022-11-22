'use strict';
const mongoose = require('mongoose');
const Book = require('./models/Book.js');
require('dotenv').config();

async function seed() {
  mongoose.connect(process.env.DB_URL)

  await Book.create({
    title: 'dune',
    description: 'sand',
    status: 'unread',
  });
  console.log('first book added');

  await Book.create({
    title: 'twilight',
    description: 'sparkles',
    status: 'read',
  });

  console.log('second book added');

  await Book.create({
    title: 'harry potter',
    description: 'scar',
    status: 'unread',
  });

  console.log('third book added');

  mongoose.disconnect();
}

seed();
