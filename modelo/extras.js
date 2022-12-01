'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaExtras = Schema({
    nombre: String,
    condicion: String,
    descripcion: String,
    pedido: { type: Schema.ObjectId, ref: "Pedido" }
});
module.exports = mongoose.model("Extras", EsquemaExtras);