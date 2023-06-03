var bcrypt = require('bcrypt');
const Usuario = require('../models').Usuario;
const jwt = require('jsonwebtoken');

module.exports = {
    create(req, res) {
        return Usuario.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(function (usuario) {
                if (!usuario) {
                    Usuario.create({
                        nombre: req.body.nombre,
                        usuario: req.body.usuario,
                        password: bcrypt.hashSync(req.body.password, 10),
                        email: req.body.email,
                        rol: req.body.rol
                    })
                        .then((usuario) => res.status(201).send(usuario))
                        .catch((error) => {
                            console.log('error', error);
                            res.status(500).send(error)
                        });
                } else {
                    res.status(200).send({ mensaje: "El usuario ya existe" });
                }
            })
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },

    authenticate(req, res) {
        return Usuario.findOne({
            where: {
                usuario: req.body.usuario
            }
        })
            .then(usuario => {
                if (!usuario) {
                    return res.status(400).send({ mensaje: "Autenticación fallida. Usuario inexistente." });
                } else if (usuario) {
                    if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                        return res.status(400).send({ mensaje: "Autenticación fallida. Contraseña incorrecta." });
                    } else {
                        return res.status(200).send({
                            token: jwt.sign({ email: usuario.email }, "FRNK", { expiresIn: '1d' }),
                            nombre: usuario.nombre,
                            rol: usuario.rol
                        })
                    }
                }
            })
            .catch((error) => {
                console.log('error', error);
                res.status(500).send(error)
            });
    },
};