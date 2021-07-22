var express = require('express');
var router = express.Router();
var sqlConn = require('../public/utils/connection');

var global = require('../public/javascripts/global')
var vGlobal = new global();

var query = require('../public/javascripts/query')
var vQuery = new query();

/* GET home page. */
router.get('/', function (req, res, next) {

    let dni = vGlobal.Dni("Get", null);

    sqlConn.query(vQuery.getListadoCompleto(dni), (err, result) => {
        if (err) {
            console.log(err);
            return res.render('error.hbs', { message: 'Error al momento de consultar los datos en la Base de Datos' }, err);
        }

        let listadoCompleto = [];
        listadoCompleto = vGlobal.getListaCompleta(result);

        res.render('lHorario.hbs', { title: 'Sistema Turno', nombre: vGlobal.User("Get", null), listHs: listadoCompleto });
    });

});

module.exports = router;