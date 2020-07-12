let fs = require('fs');
var express = require('express');
var router = express.Router();
let bcrypt = require('bcrypt');
let multer = require('multer');
var mainController = require('../controllers/mainController');
let authMiddleware = require('../middlewares/authMiddleware');
let guestMiddleware = require('../middlewares/guestMiddleware');
let adminMiddleware = require('../middlewares/adminMiddleware');
let { check, validationResult, body } = require ('express-validator');
let path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', mainController.home);

router.get('/register', guestMiddleware, mainController.register);
router.post('/register', upload.any(), /*logDBMiddleWare,*/ [
    check ('first_name').isLength({min:1}).withMessage('Es necesario ingresar un nombre'),
    check('last_name').isLength({min:1}).withMessage('Es necesario ingresar un apellido'),
    check('email').isEmail().withMessage('Email invalido').custom(value => {
        let usuariosJSON = fs.readFileSync('./data/users.json', { encoding: 'utf-8'});
        let usuarios = JSON.parse(usuariosJSON);
        for (const users of usuarios) {
            //console.log solo para chequear si efectivamente me está mostrando el mail con el quiero comparar y ver si se repite o no.
            console.log(value);
			      if(users.email === value){
                //y este console.log para mostrar que sí se repite el mail.
                console.log('mail ya en uso');
                return false;
			      }
		    }
		    return true;
    }),
    check('password').isLength({min:7}).withMessage('La contraseña debe tener al menos 7 caracteres'),
], mainController.sendregister);

router.get('/login', guestMiddleware, mainController.login);
router.post('/login', /*logDBMiddleWare,*/ [
    check('email').isEmail().withMessage('Email o contraseña invalida').custom(value => {
        let usuariosJSON = fs.readFileSync('./data/users.json', { encoding: 'utf-8'});
        let usuarios = JSON.parse(usuariosJSON);
        for (const users of usuarios) {
            console.log(value);
      			if(users.email === value){
                console.log('mail ya en uso');
                return true;
			      }
		    }
		    return false;
    }),
    check('password').isLength({min:7}).custom(value => {
        let usuariosJSON = fs.readFileSync('./data/users.json', { encoding: 'utf-8'});
        let usuarios = JSON.parse(usuariosJSON);
        for (const users of usuarios) {
            console.log(value);
            if(bcrypt.compareSync(value, users.password)){
                console.log('contraseña incorrecta');
                return true;
			      }
		    }
		    return false;
    }),
], mainController.sendlogin);

router.get("/info", mainController.infoUser);
router.post("/info", mainController.logOut)
module.exports = router;