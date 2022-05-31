const Client = require("../models/Client.model");
const Book = require("../models/Book.model");
const Review = require("../models/Review.model");

module.exports.clientController = {
    // добавление клиента
    postClient: async (req, res) => {
        try {
            const postClient = await Client.create({
                name: req.body.name
        });
        res.json(postClient)
        } catch (err) {
            res.json("ошибка при добалении клиента")
        }
    },
    // изменение клиента 
    pathClient: async (req, res) => {
        try {
            const patchClient = await Client.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                isBlocked: req.body.isBlocked,
                arendBooks: req.body.arendBooks,
            });
            res.json(patchClient)
        } catch (err) {
            res.json("ошибка при изменении клиента")
        };
    },
    // удаление клиента
    deleteClient: async (req, res) => {
        try {
            await Client.findByIdAndRemove(req.params.id);
            res.json("клиент удален");
        } catch (err) {
            res.json("ошибка при удалении клиента")
        }
    },
    // выведение клиентов
    getClients: async (req, res) => {
        try {
            const getClient = await Client.find({}).populate("arendBooks");
            res.json(getClient);
        } catch (err) {
            res.json("ошибка при выведении клиентов");
        };
    },
    // выведение клиента по Id
    getClientById: async (req, res) => {
        try {
            const clientsById = await Client.findById(req.params.id);
            res.json(clientsById);
        } catch (err) {
            res.json("ошибка при выведении одного клиента")
        }
    },
    // просматривать все книги
    getBooks: async (req,res) => {
        try {
            const getBook = await Book.find({}).populate("genre").populate("clientId");
            res.json(getBook);
        } catch (err) {
            res.json("ошибка при просматривании всех книг")
        }
    },
    // просматривание книг по определенному жанру
    getBooksByGenreId: async (req, res) => {
        try {
            const getGenre = await Book.find({genre: req.params.id}).populate("genre");
            res.json(getGenre);
        } catch (err) {
            res.json("ошибка при просматривании книг по определенному жанру")
        };
    },
    // просматривать определенную книгу
    getBooksById: async (req, res) => {
        try {
            const bookId = await Book.findById(req.params.id).populate("genre").populate("clientId");
            res.json(bookId)
        } catch (err) {
            res.json("ошибка при просматривании определенной книги")
        }
    },
    // оставлять отзыв на определенную книгу
    postReviewByBookById: async (req, res) => {
        try {
            const postReview = await Review.create({
                name: req.params.id,
                text: req.body.text,
                bookId: req.body.bookId,
            });
            res.json(postReview);
        } catch (err) {
            res.json("ошибка при добавлении отзыва на определенную книгу")
        }
    },
    // брать книгу в аренду
    pathArendBooks: async (req, res) => {
        try {

            const client = await Client.findById(req.params.id)
            const book = await Book.findById(req.body.bookId)

            if(client.isBlocked === false) {
                if(client.arendBooks.length < 3) {
                    if(book.clientId === null) {

                        await Client.findByIdAndUpdate(req.params.id, {
                            $push: {
                                arendBooks: req.body.bookId
                            }
                        }, {new: true})

                        await Book.findByIdAndUpdate(req.body.bookId, {
                            clientId: req.params.id
                        })

                        res.json('Книга успешно арендована')

                    } else {
                        res.json('эта книга уже арендована другим пользователем')
                    }
                } else {
                    res.json('нельзя арендовать больше 3-х книг одновременно')
                }
            } else {
                res.json('вы заблокированы')
            }
            
        } catch (error) {
            res.json(error.message)
        }
    },
    // возрат книги
    pathReturnBook: async (req, res) => {
        try {
            await Client.findByIdAndUpdate(req.params.id, {
                $pull: {
                    arendBooks: req.body.bookId
                }
            }, {new: true})

            await Book.findByIdAndUpdate(req.body.bookId, {
                clientId: null
            })
            res.json("книга возвращена")
        } catch (error) {
            res.json(error.message)
        }
    },
    // блокирование пользователя админом
    blockClient: async (req, res) => {
        try {
            const book = await Book.findOne({clientId: req.params.id})

            await Book.findByIdAndUpdate(book._id, {
                clientId: null
            })
            
            await Client.findByIdAndUpdate(req.params.id, {
                isBlocked: true,
                arendBooks: []
            })
        } catch (error) {
            res.json(error.message)
        }
    }
}
