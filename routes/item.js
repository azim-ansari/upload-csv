var express = require('express');
var router = express.Router();
const {addBulkItems, checkController, addBulkItemsFromCSV} = require('../controller/item')
const {uploadFile} = require('../utils/uploadExcel')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', addBulkItems);
router.get('/check', checkController);
router.post('/addBulk',uploadFile, addBulkItemsFromCSV);

module.exports = router;
