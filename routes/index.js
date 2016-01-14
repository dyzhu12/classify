var express = require('express');
var router = express.Router();
var datasource = require('../internal/datasource');

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Classify' });
});

router.get('/data/list', function(req, res, next) {
	datasource.getList(req.query.keywords, function(info) {
		res.send(info);
	});
});

router.get('/data/departments', function(req, res, next) {
	datasource.getDepartments(function(departments) {
		res.send(departments);
	});
});

router.post('/data/initialize', function(req, res, next) {
	datasource.initialize(function() {
		res.sendStatus(200);
	});
});

module.exports = router;
