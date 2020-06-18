let fs = require('fs')
var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController');
let logDBMiddleWare = require('../middlewares/logDBMiddleWare')
let { check, validationResult, body } = require ('express-validator')

/* GET home page. */
router.get('/', mainController.home);
router.get('/register', mainController.register);
router.post('/register',logDBMiddleWare ,[
    check ('name').isLength({min:1}).withMessage('Es necesario ingresar un nombre'),
    check('secondname').isLength({min:1}).withMessage('Es necesario ingresar un apellido'),
    check('email').isEmail().withMessage('Email invalido').custom(value => {
        let usuariosJSON = fs.readFileSync('./data/usuarios.json', { encoding: 'utf-8'});
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
] ,mainController.sendregister);

router.get('/login', mainController.login);
router.post('/login',logDBMiddleWare,[
    check('email').isEmail().withMessage('Email o contraseña invalida').custom(value => {
        let usuariosJSON = fs.readFileSync('./data/usuarios.json', { encoding: 'utf-8'});
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
        let usuariosJSON = fs.readFileSync('./data/usuarios.json', { encoding: 'utf-8'});
        let usuarios = JSON.parse(usuariosJSON);
        for (const users of usuarios) {
          
            console.log(value);
            
            if(users.contrasena === value){
                
                console.log('contraseña incorrecta');
               
                return true;
			}
		}
		return false;
    }),
],mainController.sendlogin);
module.exports = router;
