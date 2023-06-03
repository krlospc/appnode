const Usuario = require('../models').Usuario;
const jwt = require('jsonwebtoken');

module.exports = {
    decode: async (token) => {
        try {
            const { email } = await jwt.verify(token, "FRNK");
            const usuario = await Usuario.findOne({
                where: {
                    email: email
                }
            });
            if (usuario) {
                return usuario;
            } else {
                return false;
            }
        }
        catch (ex) {
            console.log(ex);
            return false;
        }
    }
};