const fs = require('fs');
const path = require('path');
let bcrypt = require('bcrypt')
let { check, validationResult, body } = require ('express-validator')
const db = require('../database/models');
const {Op} = require('sequelize');

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

        let usuarios = JSON.parse(fs.readFileSync('./data/users.json', {encoding:'utf-8'}));
        
        let n = usuarios.length;
        let userId = usuarios[n-1].id;
        if(errors.isEmpty()) {
        usuario = {
            id:userId + 1,
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: bcrypt.hashSync(req.body.password, 10),
            image: req.files[0].filename,
            category: req.body.category
        }

        let usersJSON = fs.readFileSync('./data/users.json', {encoding:'utf-8'});
        usersJS = JSON.parse(usersJSON);
        usersJS.push(usuario)
        usersJSON = JSON.stringify(usersJS, null, 4);
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
        //verifico si hay errores
        if(errors.isEmpty()) { // si NO hay errores
            let usersJSON = fs.readFileSync('./data/users.json', { encoding: 'utf-8'});
            let users;
            if (usersJSON == "") {
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            }
            let usuarioALoguearse;
    
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {  // si mail encontrado
                    if (bcrypt.compareSync(req.body.password, users[i].password)) { // si pass encontrada
                        usuarioALoguearse = users[i]; //encontre usuario a loguearse
                        break;
                    }
                }
            }
            if(usuarioALoguearse == undefined) { //si NO se encontro a usuario
                return res.render('login', {errors: [
                    {msg: 'Credenciales inválidas'}
                ]});
            }
            //guardar el usuario encontrado en session
            req.session.usuarioLogueado = usuarioALoguearse;
    
            if (req.body.recordame != undefined) {
                res.cookie('recordame', usuarioALoguearse.email, { maxAge: 86400000 });
            }
            //Usuario logueado
            return res.redirect('/');
        } else { //si hay errores
            return res.render('login', {errors: errors.errors});
        }
    },
    infoUser : function(req, res, next) {
        res.render("users")
    },
    logOut : function(req, res, next) {
        req.session.destroy();
        res.redirect("/");
    }


}

module.exports=mainController