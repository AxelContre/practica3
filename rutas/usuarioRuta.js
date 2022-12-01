'use strict'

var express = require('express');
var usuarioControl = require('../controlador/usuarioControl');

var api = express.Router();

api.get('/probando-controlador', usuarioControl.prueba);
api.post('/registro', usuarioControl.registrarUsuario);
api.post('/login', usuarioControl.accesoUsuario);

module.exports = api;