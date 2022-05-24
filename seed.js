const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL);

const Book = require('./models/Book.js');

async function seed() {
  // seed the database with some cats, so I can retrieve them
  const myBook = new Book({
    title:'book1',
    description:'D1'
  });
  myBook.save(function (err) {
    if (err) console.error(err);
    else console.log('saved book1');
  });

  // alternately...
  await Book.create({
    title:'book2',
    description:'D2'
  });

  await Book.create({
      title:'book3',
      description:'D3'
  })

  mongoose.disconnect();
}

seed();