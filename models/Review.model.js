
const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema ({
    clientId: {
        ref: "Client",
        type: mongoose.SchemaTypes.ObjectId
    },
    text: String,
    bookId: {
        ref: "Book",
        type: mongoose.SchemaTypes.ObjectId
    },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;