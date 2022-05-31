const {Router} = require("express");
const {genresController} = require("../controllers/genres.controller");

const router = Router();

router.post("/admin/genre", genresController.postGenre);
router.patch("/admin/genre/:id", genresController.patchGenre);
router.delete("/admin/genre/:id", genresController.deleteGenre);
router.get("/admin/genre", genresController.getGenre);

module.exports = router;