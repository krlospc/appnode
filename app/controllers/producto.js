const Producto = require('../models').Producto;
const sequelize = Producto.sequelize;

module.exports = {
    create(req, res) {
        var prod = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            cantidad: req.body.cantidad,
            categoria: req.body.categoria
        };
        return Producto.create(prod)
            .then((data) => res.status(201).send(data))
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },

    list(req, res) {
        return Producto.findAll()
            .then((data) => res.status(200).send(data))
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },

    getProductById(req, res) {
        return Producto.findByPk(req.params.id)
            .then((data) => {
                if (!data) {
                    return res.status(404).send({
                        mensaje: 'Producto no encontrado'
                    })
                }
                return res.status(200).send(data)
            })
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },

    update(req, res) {
        return Producto.findByPk(req.params.id)
            .then(producto => {
                if (!producto) {
                    return res.status(404).send({
                        mensaje: 'Producto no encontrado'
                    })
                }
                return producto.update({
                    nombre: req.body.nombre || producto.nombre,
                    precio: req.body.precio || producto.precio,
                    cantidad: req.body.cantidad || producto.cantidad,
                    categoria: req.body.categoria || producto.categoria
                })
                    .then(() => res.status(200).send(producto))
                    .catch((error) => {
                        console.log('error', error);
                        res.status(500).send(error)
                    });
            })
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },

    delete(req, res) {
        return Producto.findByPk(req.params.id)
            .then(producto => {
                if (!producto) {
                    return res.status(404).send({
                        mensaje: 'Producto no encontrado'
                    })
                }
                return producto.destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => {
                        console.log('error', error);
                        res.status(500).send(error)
                    });
            })
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },

    ventasByClienteId(req, res) {
        return sequelize.query('select * from func_compras_cliente(:clienteId)',
            {
                replacements: {
                    clienteId: req.params.id //parámetro GET id
                },
                type: sequelize.QueryTypes.SELECT
            })
            .then((data) => res.status(200).send(data))
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },
};