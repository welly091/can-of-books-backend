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
app.use(express.json())

const PORT = process.env.PORT || 3002;

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

app.post('/books', async(req, res) =>{
  try {
      const {title, description} = req.body
      await Book.create({
      title: title,
      description: description
    })
    res.send(req.body)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!!!');
  }
})

app.delete('/books/:id', async(req,res) =>{
  try {
    await Book.findByIdAndDelete(req.params.id)
    res.send('DELETE THE BOOK')
  } catch (error) {
    console.log(error)
  }
})

app.use((error, req ,res, next) =>{
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
