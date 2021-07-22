var express = require('express');
var router = express.Router();
const sqlConn = require('../public/utils/connection');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('singup.hbs', { title: 'Sistema Turno' });
});

module.exports = router;
