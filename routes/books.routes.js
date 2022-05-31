const {Router} = require("express");
const {booksController} = require("../controllers/books.controller")

const router = Router();

router.post("/admin/books", booksController.postBooks);
router.patch("/admin/books/:id", booksController.pathBooks);
router.delete("/admin/books/:id", booksController.deleteBooks);
router.get("/admin/books", booksController.getBooks);
router.get("/admin/books/:id", booksController.getBooksById);
router.get("/admin/books/genre/:id",  booksController.getBooksByGenres);

module.exports = router;