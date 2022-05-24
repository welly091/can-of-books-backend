'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Creat book schema
const bookSchema = new Schema({
    title: {type: String, required:true},
    description: {type: String, required:true},
    status: {type: Boolean, default:false}
})

//Define the Book model.
const bookModel = mongoose.model('Book', bookSchema)

module.exports = bookModel;