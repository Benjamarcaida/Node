var express = require('express');
var router = express.Router();
var productsController = require("../controllers/productsController");
let authMiddleware = require('../middlewares/authMiddleware');
let guestMiddleware = require('../middlewares/guestMiddleware');
let adminMiddleware = require('../middlewares/adminMiddleware');

/* GET home page. */
router.get("/detalle/:productsId", productsController.detail);

router.get("/genero/:productsGenero", productsController.mix);

router.get("/sale/:productsSale", productsController.saleMain);

router.get("/categoria/:productsCategory", productsController.category);


module.exports =  router;