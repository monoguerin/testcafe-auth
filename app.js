var express = require('express');

var port = 8999;
var port2 = 1234;

var app = express.createServer();

function checkAuth (req, res, next) {
	console.log('checkAuth ' + req.url);

	// don't serve /secure to those not logged in
	// you should add to this list, for each and every secure url
	if ((req.url === '/secure') && (!req.session || !req.session.authenticated)) {
		res.render('unauthorised', { status: 403 });
		return;
	}

	next();
}

app.configure(function () {

	app.use(express.cookieParser());
	app.use(express.session({ secret: 'example' }));
	app.use(express.bodyParser());
	app.use(checkAuth);
	app.use(app.router);
	app.use(express.static('static'));
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });

});

require('./lib/routes.js')(app);

app.listen(port);
console.log('Node listening on port %s', port);




var app2 = express.createServer();

app2.configure(function () {

	app2.use(express.cookieParser());
	app2.use(express.session({ secret: 'example' }));
	app2.use(express.bodyParser());
	app2.use(checkAuth);
	app2.use(app2.router);
	app2.use(express.static('static'));
	app2.set('view engine', 'jade');
	app2.set('view options', { layout: false });

});

require('./lib/routes.js')(app2, true);

app2.listen(port2);
console.log('Node listening on port %s', port2);
