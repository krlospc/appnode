const Venta = require('../models').Venta;
const Cliente = require('../models').Cliente;

module.exports = {
    create(req, res) {
        try {
            var resp = Cliente.findOne({
                where: { nombre: req.body.nombre_cliente }
            })
                .then(cliente => {
                    if (cliente == null) {
                        Cliente.create({
                            nombre: req.body.nombre_cliente,
                            telefono: "000",
                            email: "correo@correo.com"
                        })
                            .then((data) => {
                                Venta.create({
                                    cliente_id: data.id,
                                    total: req.body.total,
                                    fecha: new Date()
                                })
                                    .then((data) => res.status(201).send(data))
                                    .catch((error) => {
                                        console.log('error', error);
                                        res.status(500).send(error)
                                    });
                            })
                    } else {
                        return Venta.create({
                            cliente_id: cliente.id,
                            total: req.body.total,
                            fecha: new Date()
                        })
                            .then((data) => res.status(201).send(data))
                            .catch((error) => {
                                console.log('error', error);
                                res.status(500).send(error)
                            });
                    }
                })
                .catch((error) => {
                    console.log('error', error);
                    res.status(500).send(error)
                });
            return resp;
        } catch (ex) {
            console.log('error', ex);
            res.status(500).send(ex)
        }
    },
};