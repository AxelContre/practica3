'use strict'

const bcrypt = require('bcrypt');
var usuarioModelo = require('../modelo/usuario');
var usuario = new usuarioModelo();

function prueba(req, res) {
    res.status(200).send({
        mesagge: 'Probando una accion del controlador de usuarios del api REST con node y mongo'
    });
}

function registrarUsuario(req, res) {
    var usuario = new usuarioModelo();

    var params = req.body;
    console.log(params);

    usuario.nombre = params.nombre;
    usuario.apellido = params.apellido;
    usuario.tipodoc = params.tipodoc;
    usuario.numdoc = params.numdoc;
    usuario.direccion = params.direccion;
    usuario.telefono = params.telefono;
    usuario.email = params.email;
    usuario.password = params.password;
    usuario.rol = 'ROLE_USER';
    usuario.imagen = 'null';
    usuario.condicion = params.condicion;

    if (params.password) {
        bcrypt.hash(params.password, 10, function(err, hash) {
            usuario.password = hash;
            if (usuario.nombre != null && usuario.apellido != null && usuario.email != null) {
                //guardar en bd
                usuario.save((err, usuarioAlmacenado) => {
                    if (err) {
                        res.status(500).send({ mesagge: 'Error al guardar usuario' });
                    } else {
                        if (!usuarioAlmacenado) {
                            res.status(404).send({ mesagge: 'no se ah podido registrar el usuario' });
                        } else {
                            //nos devuelve un objeto con los datos guardados
                            res.status(200).send({ usuario: usuarioAlmacenado });
                        }
                    }
                });
            } else {
                res.status(200).send({ mesagge: 'introduce todos los campos' });
            }
        });

    } else {
        res.status(500).send({ mesagge: 'Introduce la contraseña' })
    }
}

function accesoUsuario(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    usuarioModelo.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion' });
        } else {
            if (!user) {
                res.status(404).send({ mesagge: 'El usuario no existe' });
            } else {
                bcrypt.compare(password, usuario.password, function(err, check) {
                    if (check) {
                        //Nos ayudara a devolver los datos de alguien que estar logeado
                        console.log('coincide el password')
                        if (params.gethash) {
                            //nos dueve un token
                        } else {
                            res.status(200).send({ user: user });
                        }
                    } else {
                        res.status(404).send({ mesagge: 'No se puede identificar al usuario' });
                    }
                });
            }
        }
    });
}

module.exports = {
    prueba,
    registrarUsuario,
    accesoUsuario
};