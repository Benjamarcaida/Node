const fs= require('fs');

function logDBMiddleWare(req,res,next){
    fs.appendFileSync('logDB.txt','Se creo ingrego en la pagina')
    next();
}
module.exports = logDBMiddleWare