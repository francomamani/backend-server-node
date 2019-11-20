var express = require('express');

var app = express();

var Usuario = require('../models/usuario');

//============================================
// LISTAR USUARIOS
//============================================

app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombres apellidos email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error listando usuarios!',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            })
});

//============================================
// CREAR UN NUEVO USUARIO
//============================================

app.post('/', (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombres: body.nombres,
        apellidos: body.apellidos,
        email: body.email,
        password: body.password,
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error creando usuario',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            body: usuarioGuardado
        });
    });
});
module.exports = app;
