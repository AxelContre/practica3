'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaUsuario = Schema({
    nombre: String,
    apellido: String,
    tipodoc: String,
    numdoc: String,
    direccion: String,
    telefono: String,
    email: String,
    password: String,
    rol: String,
    imagen: String,
    condicion: String,
    venta: { type: Schema.ObjectId, ref: "Venta" }

});
module.exports = mongoose.model("Usuario", EsquemaUsuario);