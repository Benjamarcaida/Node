function authMiddleware(req, res, next){
	if(req.session.usuarioLogueado != undefined) {
		next();
	} else {
        res.redirect('/');
		//res.send('Esta página es solo  para usuarios');
	}
}

module.exports = authMiddleware;