const fs = require('fs');
const db = require('../database/models');
const {Op} = require('sequelize');

const productsController = {
    mix : function(req, res, next) {
        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);

        let genero = []
		datajs.forEach(function (product) {
			if (product.gender == req.params.productsGenero) {
				genero.push(product)
			}
		})

        res.render("products/productsMix", {datajs : datajs, genero : genero, nombreGenero : req.params.productsGenero});
    },

    saleMain : function(req, res, next) {

        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);

        let sale = []
        datajs.forEach(function (products) {
            if(products.sale == "si" && products.sale == req.params.productsSale) {
                sale.push(products)
            }
        });

        res.render("products/sale", {sale : sale, nombreTitulo : req.params.productsSale })
    },

    category : function(req, res, next) {

        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);

        let genero = []

        datajs.forEach(function (products) {
            if(products.category == req.params.productsCategory) {
                genero.push(products);
            }
        })

        res.render("products/productsMix", {datajs : datajs, genero : genero, nombreGenero : req.params.productsCategory});
    },

    detail : function(req, res, next) {
        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);
        let productsId = []
        datajs.forEach(function (products){
            if (products.id == req.params.productsId){
                productsId.push(products)
            }
        })
        res.render("products/detailM", {productsId : productsId})
    }
    
        /*
        //Traes la base de datos 
        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);
        //Creas variable con array vacio
        let productsId= []
        //Recorres la variable donde esta almacenada la base de datos
        datajs.forEach(function (product) {
        //le preguntas si el id es igual al que pasaron por la url 
            if (product.id == req.params.productsId) {
                productsId.push(product)
            }
        })
*/
}

module.exports = productsController