const {Router} = require("express");
const {clientController} = require("../controllers/clients.controller");

const router = Router();


router.post("/clients", clientController.postClient);
router.patch("/clients/:id", clientController.pathClient);
router.delete("/clients/:id", clientController.deleteClient);
router.get("/clients", clientController.getClients);
router.get("clients/:id", clientController.getClientById);
router.get("/books", clientController.getBooks);
router.get("/books/:id", clientController.getBooksById);
router.get("/books/genre/:id", clientController.getBooksByGenreId);
router.post("/clients/review", clientController.postReviewByBookById);
router.patch("/clients/:id/arendBooks", clientController.pathArendBooks);
router.patch("/clients/:id/returnBooks", clientController.pathReturnBook);
router.patch("/admin/clents/:id/blocked", clientController.blockClient);

module.exports = router;