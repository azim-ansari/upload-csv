var express = require('express');
var router = express.Router();
const itemRouter = require('./item')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/items', itemRouter)

module.exports = router;
