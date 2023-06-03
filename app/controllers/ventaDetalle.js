const Cliente = require('../models').Cliente;

const VentaDetalle = require('../models').VentaDetalle;
const sequelize = VentaDetalle.sequelize;

module.exports = {

        create(req, res) {
        try {
            var resp = Cliente.findOne({
                where: { nombre: req.body.nombre_cliente }
            })
                .then(cliente => {
                    if (cliente == null ) {
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

    create(req, res) {
        Cliente.findOne({
                where: { nombre: req.body.cliente.nombre }
            })
            .then(cliente => {
                if (cliente == null) {
                    return Cliente.create({
                        nombre: req.body.cliente.nombre,
                        telefono: req.body.cliente.telefono,
                        email: req.body.cliente.email
                    })
                }
                return cliente
            })
            .then(anscliente => {
                return Venta.create({
                    cliente_id: anscliente.id,
                    total: req.body.total,
                    fecha: new Date()
                })
            })
            .then(venta => {
                const items = []
                req.body.productos.forEach(item => {
                    items.push({
                        producto_id: item.id,
                        venta_id: venta.id,
                        precio: item.precio
                    })
                });
                return VentaDetalle.bulkCreate(items)
            })
            .then((data) => res.status(201).send(data))
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },
    delete(req, res) {
        return Venta.findByPk(req.params.id)
            .then(venta => {
                if (!venta) {
                    return res.status(404).send({
                        mensaje: 'Venta no encontrada'
                    })
                }
                return VentaDetalle.destroy({ where: { venta_id: req.params.id } })
                    .then(() => {
                        return venta.destroy()
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
            })
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },    

    productosMasVentdidos(req, res) {
        return sequelize.query('select p.nombre, sum(vd.precio) from venta_detalle vd inner join producto p on (vd.producto_id = p.id) group by p.id order by sum(vd.precio) desc limit 10',
            {
                /*replacements: {
                    clienteId: req.params.id 
                },*/
                type: sequelize.QueryTypes.SELECT
            })
            .then((data) => res.status(200).send(data))
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },   
}