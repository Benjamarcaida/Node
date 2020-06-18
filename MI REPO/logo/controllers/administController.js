const fs = require('fs');
//const path = require('path');

//const productsFilePath = path.join(__dirname, './data/productos.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const administController = {
    main : function(req, res) {
        res.render("administ");
    },
    cargar : function(req, res) {
        let n = products.length;
        let pdtoId = products[n-1].id;
        let products =  {
            id : pdtoId+1,
            foto : req.body.foto,
            nombre : req.body.producto,
            precio : req.body.precio,
            talles : req.body.Talles,
            categoria : req.body.categoria,
            genero : req.body.sexo,
            sale : req.body.sale
        }
        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);
        datajs.push(products);
        datajson = JSON.stringify(datajs, null, 4)
        fs.writeFileSync("./data/products.json", datajson);
        res.redirect("/administrador/");
    },

    edit : function(req, res, next) {
        let pdtoId= req.params.productId;
        let productToEdit = null;

        let datajson = fs.readFileSync('./data/products.json');
        let products = JSON.parse(datajson);

        productToEdit = products.find(pdto => pdto.id == pdtoId);
		res.render('administEdit',{productToEdit});
    },

    update: (req, res) => {
		let pdtoNuevo = {
            id: req.params.productId,
            foto: req.body.foto,
			nombre: req.body.producto,
			precio: req.body.precio,
			talles: req.body.Talles,
            categoria: req.body.categoria,
            genero: req.body.sexo,
            sale: req.body.sale
		}

        let datajson = fs.readFileSync('./data/products.json');
        let products = JSON.parse(datajson);
        products.push(pdtoNuevo);
        let productoNuevoJSON = JSON.stringify(products, null, 4);
		fs.writeFileSync("./data/products.json", productoNuevoJSON);

		res.redirect('/');
    },
    
    destroy : (req, res) => {
		let pdtoId = req.params.productId;
     
        let datajson = fs.readFileSync('./data/products.json');
        let products = JSON.parse(datajson);

        let productosNoEliminados = products.filter(product=>{
		    return product.id != pdtoId;
		});

        let productosNoEliminadosJSON = JSON.stringify(productosNoEliminados, null, 4);
		fs.writeFileSync("./data/products.json", productosNoEliminadosJSON);

        res.redirect('/'); 
	}

}



module.exports = administController;