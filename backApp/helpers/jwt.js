var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'ericortiz';

exports.createToken = function(user){
    console.log('helpers jwt', user);
    var payload = {
        empresa: user.idEmpresa[0],
        sub: user.idUsuario,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        rol: user.descripcion,
        iat: moment().unix(),
        exp: moment().add(1,'day').unix()
    
        // exp: moment().add(7,'day').unix()
    }
    console.log('helpers jwt rol despues de agregar el payload', payload);

    return jwt.encode(payload,secret);
}