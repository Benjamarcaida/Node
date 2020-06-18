const fs = require('fs');
const path = require('path');
let { check, validationResult, body } = require ('express-validator')

const mainController = {
    home: function (req,res) {
        res.render('index')
    },

    carrito : function (req,res){
        res.render('carrito')
    },

    pago : function (req,res){
        res.render('pago')
    },
    register: function(req, res, next){
        res.render('registro');
    },
    sendregister: function(req,res,next){
        let errors = validationResult(req);
        if(errors.isEmpty()) {
        usuario ={
            email: req.body.email,
            nombre: req.body.name,
            apellido: req.body.secondname,
            contrasena: req.body.password,
        }

        let usersJSON = fs.readFileSync('./data/usuarios.json', {encoding:'utf-8'});
        usersJS = JSON.parse(usersJSON);
        usersJS.push(usuario)
        usersJSON = JSON.stringify(usersJS);
        fs.writeFileSync('./data/users.json', usersJSON);
                res.redirect('/')
         } else{
             res.render('registro', {errors:errors.errors})
         }
    },
    login: function(req, res, next){
        res.render('login');
    },
    sendlogin: function(req,res, next){
        let errors = validationResult(req);
        let usersJSON = fs.readFileSync('./data/users.json',{encoding:'utf-8'})
        usersJS = JSON.parse(usersJSON);
        let userLog = false
        usersJS.forEach((users) => {
            if(users.email == req.body.email && users.password == req.body.password) {
                    userLog = users; 
                    req.session.userLog = userLog;
                    console.log(req.session.userLog)
                    console.log(userLog)
                    res.locals.userLog = userLog;
                    console.log(res.locals.userLog)
                    res.redirect('/')
            }

        });

        if(userLog == false) {
            return res.render('login', {errors : [
                {msj : "Contraseña o email invalido"}
            ]});
        }

        

        /*if(errors.isEmpty()) {
        usuario = {
            email: req.body.email,
            contrasena: req.body.password
        }
        res.redirect('/')
        } else {
            res.render('login', {errors:errors.errors})
        }*/
   }, 
   header : function(req, res, next) {

   }

}

module.exports=mainController