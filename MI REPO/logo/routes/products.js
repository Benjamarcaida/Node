var express = require('express');
var router = express.Router();
var productsController = require("../controllers/productsController")

/* GET home page. */
router.get("/detalle/:productsId", productsController.detail);

router.get("/genero/:productsGenero", productsController.mix);

router.get("/sale/:productsSale", productsController.saleMain);

router.get("/categoria/:productsCategory", productsController.category);


module.exports =  router;