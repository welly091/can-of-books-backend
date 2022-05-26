'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Import schema
const Book = require('./models/Book.js');

//Connect to mongoDB
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {
  response.send('test request received');
});

app.get('/books', getBooks);
app.post('/books', postBooks);
app.put('/books/:id', putBooks);
app.delete('/books/:id', deleteBooks);

async function getBooks(req, res, next) {
  let queryObject = {};
  if (req.query.title) {
    queryObject = {
      title: req.query.title,
    };
  }
  try {
    let results = await Book.find(queryObject);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function postBooks(req, res, next) {
  try {
    let addedBook = await Book.create(req.body);
    res.status(200).send(addedBook.data);
  } catch (error) {
    next(error);
  }
}

async function putBooks(req, res, next) {
  try {
    let updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      overwrite: true,
    });
    res.status(200).send(updatedBook);
  } catch (error) {
    next(error);
  }
}

async function deleteBooks(req, res, next) {
  try {
    let deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedBook);
  } catch (error) {
    next(error);
  }
}

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
