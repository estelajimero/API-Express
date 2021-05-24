const modelo = require("../models/agendaModel");
let moment = require('moment');

moment().format();

//File: controllers/contacto.js
let mongoose = require('mongoose');

//GET - Return all contactos in the DB
exports.findAllContactos = function (req, res) {
    modelo.find(function(err, contactos) {
        if (err) res.send (500, err.message);

        console.log('GET /contacto')
        
        res.status(200).json(contactos);
    });
};

//GET - Return a contact with specified ID
exports.findById = function(req, res) {
    modelo.findById(req.params.id, function(err, contacto) {
        if (err) return res.send(500, err.message);

        console.log('GET /contacto/' + req.params.id);
        
        res.status(200).json(contacto);
    })
}

// Validaciones
function Validation(data) {
    let errors = [];

    // RegEx
    let noNumber = /^[a-zA-ZÀ-ÿ\00f1\00d1]+(\s*[a-zA-ZÀ-ÿ\00f1\00d1]*)*[a-zA-ZÀ-ÿ\00f1\00d1]+$/;
    let noLetter = /\d/;
    let dniRegex = /^[0-9]{8,8}[A-Za-z]$/;
    let genderArray = ['Mujer', 'Hombre', 'No binario', 'Prefiero no decirlo'];

    //Nombre
    if (noNumber.test(data.nombre) == false || data.nombre.length < 3) {
        errors.push("El campo nombre debe tener más de 3 caracteres y no debe contener números.");
    }

    //Apellidos
    if (noNumber.test(data.apellidos) == false || data.apellidos.length < 3) {
        errors.push("El campo apellidos debe tener más de 3 caracteres y no debe contener números.");
    } 

    //Edad
    if ((data.edad >= 125 || data.edad < 0) || noLetter.test(data.edad) == false) {
        errors.push("La edad debe estar comprendida entre 0 y 125. Debe ser un número");
    }

    //DNI
    if (dniRegex.test(data.dni) == false) {
        errors.push("El dni deben ser 9 caracteres, 8 números y una letra.");
    }

    //Fecha
    if (moment(data.cumpleanos, 'YYYY-MM-DD', true).isValid() == false) {
        errors.push("Introduzca una fecha en formato ISO8601: AAAA-MM-DD.");
    }

    //Color favorito
    if (noNumber.test(data.colorFavorito) == false || data.colorFavorito.length < 3) {
        errors.push("El campo color debe tener más de 3 caracteres y no debe contener números.");
    }

    // Género
    if (genderArray.find(a => a === data.sexo) == undefined) {
        errors.push("El género debe estar comprendido entre: Mujer, Hombre, No binario o Prefiero no decirlo.");
    }

    return errors;
} 

//POST - Insert a new contact in the DB
exports.addContacto = function (req, res) {
    console.log('POST');
    console.log(req.body);

    let testResult = Validation(req.body);

    if(testResult.length < 1) {
        let contactoNuevo = new modelo({
            nombre:         req.body.nombre,
            apellidos:      req.body.apellidos,
            edad:           req.body.edad,
            dni:            req.body.dni,
            cumpleanos:     req.body.cumpleanos,
            colorFavorito:  req.body.colorFavorito,
            sexo:           req.body.sexo
        });
    
        contactoNuevo.save(function(err, contactoNuevo) {
            if(err) return res.status(500).send(err.message);
    
            res.status(200).json(contactoNuevo);
        });   
    } else {
        res.status(200).json(testResult);
    }    
};

//PUT - Update a register already exists
exports.updateContacto = function(req, res) {
        modelo.findById(req.params.id, function(err, contacto) {
            if (err) return res.send(500, err.message);

            let testResult = Validation(req.body);

            if (testResult.length < 1) {
                contacto.nombre = req.body.nombre;
                contacto.apellidos = req.body.apellidos;
                contacto.edad = req.body.edad;
                contacto.dni = req.body.dni;
                contacto.cumpleanos = req.body.cumpleanos;
                contacto.colorFavorito = req.body.colorFavorito;
                contacto.sexo = req.body.sexo;

                contacto.save(function(err) {
                    if (err) return res.status(500).send(err.message);
                    res.status(200).json(contacto);
                });
            } else {
                res.status(200).json(testResult);
            }
    });
};

//DELETE - Delete a contact with specified ID
exports.deleteContacto = function(req, res) {
    modelo.findById(req.params.id, function(err, contacto) {
        contacto.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};