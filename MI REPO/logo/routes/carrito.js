var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController');
let authMiddleware = require('../middlewares/authMiddleware');
let guestMiddleware = require('../middlewares/guestMiddleware');
let adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', mainController.carrito);

router.get('/pago', authMiddleware, mainController.pago);

module.exports = router;
