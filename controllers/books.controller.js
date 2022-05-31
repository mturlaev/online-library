const Book = require("../models/Book.model");

module.exports.booksController = {
    postBooks: async (req, res) => {
        try {
            const addBook = await Book.create({
                name: req.body.name,
                genre: req.body.genre,
                clientId: req.body.clientId,
            });
            res.json(addBook)
        } catch (err) {
            res.json("ошибка при добавлении книги")
        }
    },
    pathBooks: async (req, res) => {
        try {
            const book2 = await Book.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                genre: req.body.genre,
                clientId: req.body.clientId,
            });
            res.json(book2)
        } catch (err) {
            res.json("ошибка при изменении книги")
        }
    },
    deleteBooks: async (req, res) => {
        try {
            await Book.findByIdAndRemove(req.params.id);
            res.json("книга удалена")
        } catch (err) {
            res.json("оштибка при удалении книги")
        }
    },
    getBooks: async (req, res) => {
        try {
            const book = await Book.find().populate("genre").populate("clientId");
            res.json(book)
        } catch (err) {
            res.json("ошибка при выведении книг")
        }
    },
    getBooksById: async (req, res) => {
        try {
            const bookById = await Book.findById(req.params.id).populate("genre").populate("clientId");
            res.json(bookById);
        } catch (err) {
            res.json("ошибка при выведении книги");
        }
    },
    getBooksByGenres: async (req, res) => {
        try {
            const bookByGenres = await Book.find({genre: req.params.id}).populate("genre");
            res.json(bookByGenres);
        } catch (err) {
            res.json("ошибка при выведени книги из определенного жанра")
        }
    },
};