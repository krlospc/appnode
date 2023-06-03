const Cliente = require('../models').Cliente;
const sequelize = Cliente.sequelize;

module.exports = {
    create(req,res){
        var client = {
            nombre:req.body.nombre,
            telefono:req.body.telefono,
            email:req.body.email,
        };
        return Cliente.create(client)
        .then((data) => res.status(201).send(data))
        .catch((error) => {
            console.log('error', error);
            res.status(500).send(error)
        });
    },
    list(req, res) {
        return Cliente.findAll()
            .then((data) => res.status(200).send(data))
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },
    getClientById(req, res) {
        return Cliente.findByPk(req.params.id)
            .then((data) => {
                if (!data) {
                    return res.status(404).send({
                        mensaje: 'Cliente no encontrado'
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
        return Cliente.findByPk(req.params.id)
            .then(cliente => {
                if (!cliente) {
                    return res.status(404).send({
                        mensaje: 'Cliente no encontrado'
                    })
                }
                return cliente.update({
                    nombre: req.body.nombre || cliente.nombre,
                    telefono: req.body.telefono || cliente.precio,
                    email: req.body.email || cliente.cantidad
                    
                })
                    .then(() => res.status(200).send(cliente))
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
        return Cliente.findByPk(req.params.id)
            .then(cliente => {
                if (!cliente) {
                    return res.status(404).send({
                        mensaje: 'cliente no encontrado'
                    })
                }
                return cliente.destroy()
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
        return sequelize.query('select v.id, v.total, v.fecha from cliente c inner join venta v on (v.cliente_id = c.id) where c.id =:clienteId',
            {
                replacements: {
                    clienteId: req.params.id 
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