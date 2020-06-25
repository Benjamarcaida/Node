var express = require('express');
var router = express.Router();
var moviesController = require("../controllers/moviesController");
const { Router } = require('express');
const {check, validationResult, body} = require("express-validator");

router.get("/", moviesController.list);

router.get("/detalle/:id", moviesController.detail)

router.get("/genre/:id", moviesController.genre);

router.get("/actors/:id", moviesController.actors)

router.get("/create", moviesController.create);
router.post("/create",[
    check('rating').isInt({min : 1}).withMessage("Rating minimo 1"),
    check('title').isLength({min : 2}).withMessage("Minino 2 caracteres")
], moviesController.cargar);

router.get("/edit/:id", moviesController.update);
router.post("/edit/:id",[
    check('rating').isInt({min : 1}).withMessage("Rating minimo 1"),
    check('title').isLength({min : 2}).withMessage("Minino 2 caracteres")
], moviesController.edit);
router.post("/delete/:id", moviesController.destroy);

module.exports = router;