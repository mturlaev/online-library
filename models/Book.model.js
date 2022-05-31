const express = require("express");
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    name: String,
    genre: {
        ref: "Genre",
        type: mongoose.SchemaTypes.ObjectId
    },
    clientId: {
        ref: "Client",
        type: mongoose.SchemaTypes.ObjectId,
        default: null
    },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;