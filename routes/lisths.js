var express = require('express');
var router = express.Router();
var sqlConn = require('../public/utils/connection');

var global = require('../public/javascripts/global')
var vGlobal = new global();

var query = require('../public/javascripts/query')
var vQuery = new query();

/* GET home page. */
router.get('/', function (req, res, next) {

  let op = vGlobal.Option("Get", null);
  let fecha = vGlobal.Date("Get", null);
  let dni = vGlobal.Dni("Get", null);
  let hs = vGlobal.Hour("Get", null);

  if (op === "Asignar") {

    sqlConn.query(vQuery.insertHorario(fecha, hs, dni),
      (err, result) => {
        if (err) {
          console.log(err);
          return res.render('error.hbs', { message: 'Error al momento de borrar los datos en la Base de Datos' }, err);
        }
      }
    );

  } else {

    sqlConn.query( vQuery.deleteHorario(fecha, dni),
      (err, result) => {
        if (err) {
          console.log(err);
          return res.render('error.hbs', { message: 'Error al momento de borrar los datos en la Base de Datos' }, err);
        }
      }
    );

  }

  sqlConn.query(vQuery.selectHorario(fecha), (err, result) => {
    if (err) {
      console.log(err);
      return res.render('error.hbs', { message: 'Error al momento de consultar los datos en la Base de Datos' }, err);
    }
    let count = vGlobal.setHorario(result);

    let listadoTabla = [];
    listadoTabla = vGlobal.createTable(count);

    res.render('lisths.hbs', { title: 'Sistema Turno', nombre: vGlobal.User("Get", null), listHs: listadoTabla, loadDate: fecha });
  });

});

module.exports = router;
