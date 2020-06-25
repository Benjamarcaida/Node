const movies = require("../database/models/Movie");
let db = require ("../database/models");
var Sequelize = require("sequelize");
const { where } = require("sequelize");
const { raw } = require("express");
const Op = Sequelize.Op;
const {check, validationResult, body} = require("express-validator");


const moviesController = {
    list : function(req, res, next) {
        db.Movies.findAll()
        .then(function(movies){
            res.render("moviesIndex",{movies})
        })
        .catch(function(error) {
            console.log(error);
            res.send("error")
        })
    },
    detail : function(req, res, next) {
        let detalle = req.params.id;
        db.Movies.findByPk(detalle, {
            include : ["generos", "Actors"],
            //raw : true,
            nest : true
        })
        .then(function(movie) {
            //db.Actors.findAll();
            console.log(movie)
            //res.render(hola)
            res.render("detail", {movie})
        });
    },
    create : function(req, res, next) {
        db.Genre.findAll()
        .then(function(generos) {
            res.render("movies", {generos})
        })
        
    },
    cargar : function(req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.Genre.create (req.body)
            .then(function(generos) {
                console.log(generos)
                res.redirect("/movies/")
            })
        } else {
            let generos = []
            res.render("movies", {errors : errors.errors, generos})
        }
    
    },
    update : function(req, res, next) {
        let edit = req.params.id
        db.Movies.findByPk(edit) 
            .then(function(pelicula) {
                res.render("update", {pelicula})
            })
    },
    edit : function(req, res, next) {
        //let errors = validationResult(req);
        //if (errors.isEmpty()) {
        db.Movies.update(
            req.body, {
                where : {
                    id : req.params.id
                }
            }  
        ).then(function(pelicula) {
            res.redirect("/movies/edit/" + req.params.id,)
        })
    //} else {
        //let pelicula = []
        //res.render("update", {errors : errors.errors, pelicula})
    },
    destroy : function (req, res, next) {
        db.Movies.destroy({
            where : {
                id : req.params.id
            }
        });
        res.redirect("/movies")
    },
    genre : function(req, res, next) {
        let detalle = req.params.id
        db.Genre.findByPk(detalle, {
            include : ['peliculas'],
            nest : true
        })
        .then(function(genero) {
            console.log(genero)
            res.render("genre", {genero})
        })
    },
    actors : function(req, res, next) {
        let detalle = req.params.id
        db.Actors.findByPk(detalle, {
            include : ['Movies']
        })
        .then(function(actors) {
            console.log(actors);
            res.render("actors", {actors});
        })
    }
}

module.exports = moviesController;