const mongoose = require('mongoose');
const Book = require('./Book.js');
require('dotenv').config();

async function seed() {
  mongoose.connect(process.env.DB_URL)

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function () {
    console.log('Mongoose is connected')
  });

  await Book.create({
    title: 'dune',
    description: 'sand',
    status: 'unread',
  });

  await Book.create({
    title: 'twilight',
    description: 'sparkles',
    status: 'read',
  });

  await Book.create({
    title: 'harry potter',
    description: 'scar',
    status: 'unread',
  });


  mongoose.disconnect();
}

seed();