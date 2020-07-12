let fs = require('fs');

function recordameMiddleware(req,res,next){
    if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined) {
        let usersJSON = fs.readFileSync('./data/users.json', {encoding:'utf-8'})
        let usuario;
        if (usersJSON == '') {
            usuario = []
        } else {
            usuario = JSON.parse(usersJSON);
        }
        let usuarioALoguearse;
            
        for(let i = 0; i < usuario.length; i++) {
            if(req.cookies.recordame == usuario[i].email) {
                usuarioALoguearse = usuario[i];
                break;
                    
            }
        }
        req.session.usuarioLogueado = usuarioALoguearse;
    }
    next();
}

module.exports = recordameMiddleware