'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Import schema
const Book = require('./models/Book.js')

//Connect to mongoDB
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Mongoose is connect');
})


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', getBooks)

async function getBooks(req, res, next){
  let queryObject = {}
  if(req.query.title){
    queryObject = {
      title: req.query.title,
    }
  }
  try {
    let results = await Book.find(queryObject);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

app.use((error, req ,res, next) =>{
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
