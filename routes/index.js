var express = require('express');
var router = express.Router();
var sqlConn = require('../public/utils/connection');

var global = require('../public/javascripts/global')
var vGlobal = new global();

var query = require('../public/javascripts/query')
var vQuery = new query();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.hbs', { title: 'Sistema Turno' });
});

router.post('/create-user', (req, res) => {

  const data = req.body;
  let cError = vGlobal.checkItem(data);

  if (cError != '') {
    res.render('singup.hbs', { title: 'Sistema Turno', checkError: cError });
  }

  let persona = vGlobal.getPersona();

  persona.forEach(Element => {
    sqlConn.query( vQuery.insertUsuario(Element),(err, result) => {
        if (err) {
          console.log(err);
          return res.render('error.hbs', { message: 'Error al momento de insertar los datos en la Base de Datos' }, err);
        }
        console.log(result);
        res.render('index.hbs', { title: 'Sistema Turno' });
      }
    );
  });


});

router.post('/login-user', (req, res) => {

  const data = req.body;

  sqlConn.query(vQuery.loginUser(data), (err, result) => {
    if (err) {
      console.log(err);
      return res.render('error.hbs', { message: 'Error al momento de consultar los datos en la Base de Datos' }, err);
    }

    if (result.length == 1) {

      result.forEach(Element => {
        vGlobal.Dni("Set", Element.DNI);
        vGlobal.User("Set", Element.Nombre);
      });

      let fecha = vGlobal.toDay();

      sqlConn.query(vQuery.selectHorario(fecha), (err, result) => {
        if (err) {
          console.log(err);
          return res.render('error.hbs', { message: 'Error al momento de consultar los datos en la Base de Datos' }, err);
        }
        let count = vGlobal.setHorario(result);

        let listadoTabla = [];
        listadoTabla = vGlobal.createTable(count);

        res.render('lisths.hbs', { title: 'Sistema Turno', nombre: vGlobal.User("Get", null), listHs: listadoTabla });

      });

    } else {
      res.render('index.hbs', { title: 'Sistema Turno', viewError: 'Usuario o contraseña inválido' });
    }

  });

});


router.post('/loadDate', (req, res) => {

  const data = req.body;
  let fecha = data.calendar;
  vGlobal.Date("Set", fecha)

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

router.post('/dataAB', (req, res) => {

  const data = req.body;
  vGlobal.Hour("Set", data.hour);
  vGlobal.Option("Set", data.option)

});

router.get('/selectHour', function (req, res) {

  const data = req.body;
  vGlobal.User("Set", data.nameUser);
  let fecha = vGlobal.toDay();

  sqlConn.query(vQuery.selectHorario(fecha), (err, result) => {
      if (err) {
          console.log(err);
          return res.render('error.hbs', { message: 'Error al momento de consultar los datos en la Base de Datos' }, err);
      }
      let count = vGlobal.setHorario(result);

      let listadoTabla = [];
      listadoTabla = vGlobal.createTable(count);

      res.render('lisths.hbs', { title: 'Sistema Turno', nombre: vGlobal.User("Get", null), listHs: listadoTabla });

  });

});


module.exports = router;
