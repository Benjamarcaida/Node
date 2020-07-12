function adminMiddleware(req, res, next) {
    if (req.session.usuarioLogueado == undefined) {
        res.redirect("/")        
    } else if (req.session.usuarioLogueado[0].category == "admin"){
        next();            
    } else {
        res.redirect("/")
    }
}

module.exports = adminMiddleware;