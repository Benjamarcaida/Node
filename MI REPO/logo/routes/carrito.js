var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController')


router.get('/', mainController.carrito)

router.get('/pago', mainController.pago)

module.exports = router;
