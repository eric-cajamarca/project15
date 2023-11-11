var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'ericortiz';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombres: user.name,
        apellidos: user.apellidos,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(1,'day').unix()
    
        // exp: moment().add(7,'day').unix()
    }

    return jwt.encode(payload,secret);
}