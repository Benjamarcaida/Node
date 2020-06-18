var express = require('express');
var router = express.Router();
var administController = require("../controllers/administController");


router.get('/', administController.main);
router.post('/', administController.cargar);

router.get("/edit/:productId", administController.edit);
router.put("/edit/:productId", administController.update);

router.delete('/delete/:productId', administController.destroy);

module.exports = router;