const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL);

const Book = require('./models/Book.js');

async function seed() {
  // seed the database with some cats, so I can retrieve them
  // const myBook = new Book({
  //   title:'book1',
  //   description:'D1'
  // });
  // myBook.save(function (err) {
  //   if (err) console.error(err);
  //   else console.log('saved book1');
  // });

  // alternately...
  await Book.create({
    title:'Harry Potter and the Prisoner of Azkaban',
    description: "For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black. Convicted of killing thirteen people with a single curse, he was said to be the heir apparent to the Dark Lord, Voldemort."
  });


  mongoose.disconnect();
}

seed();