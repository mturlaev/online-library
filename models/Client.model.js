const express = require("express");
const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    name: String,
    isBlocked: {
        type: Boolean,
        default: false,
    },
    arendBooks: [
        {
            ref: "Book",
            type: mongoose.SchemaTypes.ObjectId,
        }
    ]
})

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;