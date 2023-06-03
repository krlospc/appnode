const ContaCuenta = require('../models').ContaCuenta;

module.exports = {
    getProductById(req, res) {
        console.log(req.params);
        res.json({ mensaje: 'Llegó desde GET ' + req.params.id });
    },

    pruebaPost(req, res) {
        //console.log(req.body.valor);
        res.json({ mensaje: 'Llegó desde POST ' + req.body.otrodato });
    },

    listCuentas(req, res) {
        return ContaCuenta.findAll()
            .then((data) => res.status(200).send(data))
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },

};