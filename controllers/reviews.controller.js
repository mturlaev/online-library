const Review = require ("../models/Review.model");

module.exports.reviewsController = {
    postReview: async (req, res) => {
        try {
            const reviews = await Review.create({
                clientId: req.body.clientId,
                text: req.body.text,
                bookId: req.body.bookId,
            });
            res.json(reviews);
        } catch (err) {
            res.json(err.message);
        }
    },
    deleteReview: async (req, res) => {
        try {
            await Review.findByIdAndRemove(req.params.id);
            res.json("удалено")
        } catch (err) {
            res.json("ошибка при удалении рецензии")
        };
    },
    getReview: async (req, res) => {
        try {
            const Reviews =await Review.find().populate("clientId");
            res.json(Reviews)
        } catch (err) {
            res.json("ошибка при выведении рецензий")
        }
    },
    getReviewByBook: async (req, res) => {
        try {
            const Reviews = await Review.find({bookId: req.params.id});
            res.json(Reviews)
        } catch (err) {
            res.json("ошибка при выведении рецензии к определенной книге")
        }
    },
}