var express = require('express');
var router = express.Router();
var datasource = require('../internal/datasource');

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Classify' });
});

router.get('/data/list', function(req, res, next) {
	res.send(datasource.getList(req.query.keywords));
});

router.post('/data/initialize', function(req, res, next) {
	datasource.initialize();
});

module.exports = router;
