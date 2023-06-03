const tokenService = require('../services/token');

module.exports = {
    verificaUsuario: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({ mensaje: "No token." });
        }
        const response = await tokenService.decode(req.headers.token); //retorna el modelo Usuario o false
        if (response) {
            if (response.dataValues.rol == 'ADM' || response.dataValues.rol == 'VEN' || response.dataValues.rol == 'ALM') {
                next();
            } else {
                return res.status(403).send({ mensaje: "No autorizado." });
            }
        } else {
            return res.status(403).send({ mensaje: "No autorizado." });
        }
    },
};