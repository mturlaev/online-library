const {Router} = require("express");


const router = Router();

router.use(require("../routes/books.routes"));
router.use(require("../routes/clients.routes"));
router.use(require("../routes/genres.routes"));
router.use(require("../routes/reviews.routes"));


module.exports = router;