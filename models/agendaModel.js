let { Schema, mongo } = require("mongoose");

let mongoose = require('mongoose');
    Schema = mongoose.Schema;

let nuevoContactoSchema = new Schema({
    nombre          : {type: String},
    apellidos       : {type: String},
    edad            : {type: Number},
    dni             : {type: String},
    cumpleanos      : {type: Date},
    colorFavorito   : {type: String},
    sexo            : {type: String, enum:
    ['Mujer', 'Hombre', 'No binario', 'Prefiero no decirlo']                
    }
});

module.exports = mongoose.model('agenda', nuevoContactoSchema);