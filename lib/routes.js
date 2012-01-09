var util = require('util');

module.exports = function (app) {

	app.get('/', function (req, res, next) {
		res.render('index');
	}); 

	app.get('/welcome', function (req, res, next) {
		res.render('welcome');
	});

	app.get('/secure', function (req, res, next) {
		res.render('secure');
	});

};
