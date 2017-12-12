var util = require('util');
var axios = require('axios');

module.exports = function (app, secondPass) {

	app.get('/', function (req, res, next) {
		res.render('index');
	}); 

	app.get('/welcome', function (req, res, next) {
		res.render('welcome');
	});

	app.get('/secure', function (req, res, next) {
		res.render('secure');
	});

	app.get('/breeds', function (req, res, next) {
		axios.get('https://dog.ceo/api/breeds/list')
		.then(function (response) {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
			res.setHeader('Content-Type', 'application/json');
			res.send("{}");
		});
	});

	app.get('/login', function (req, res, next) {
		res.render('login', { flash: req.flash() } );
	});

	app.post('/login', function (req, res, next) {

		var username = secondPass ? 'user2' : 'user';
		var password = secondPass ? 'pass2' : 'pass';

		// you might like to do a database look-up or something more scalable here
		if (req.body.username && req.body.username === username && req.body.password && req.body.password === password) {
			req.session.authenticated = true;
			res.redirect('/secure');
		} else {
			req.flash('error', 'Username and password are incorrect');
			res.redirect('/login');
		}

	});

	app.get('/logout', function (req, res, next) {
		delete req.session.authenticated;
		res.redirect('/');
	});

};
