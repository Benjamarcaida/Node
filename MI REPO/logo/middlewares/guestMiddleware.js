function guestMiddleware(req, res, next){
	if(req.session.usuarioLogueado == undefined){
		next();
	} else {
        res.redirect('/');
		//res.send('Esta página es solo  para invitados');
	}
}

module.exports = guestMiddleware;

//en /routes colocar en cabercera
//let guestMiddleware = require('../middlewares/guestMiddleware');
//en router.get('/register', guestMiddleware, usersController.register);