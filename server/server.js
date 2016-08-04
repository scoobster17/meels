/**
 * Server config for Muppet mapping app
 */

/* DEPENDENCIES */

var express = require('express');

/* ************************************************************************** */

/* APP SETUP */

var app = express();

app.use( express.static(__dirname + "/../app") );

app.use(express.static('data'));
app.use('/data', express.static('data'));

// app.use(express.static('bower_components'));
// app.use('/bower_components', express.static('bower_components'));

/*
app.get('/', function(req, res) {
	fs.readFile( __dirname + '../app/index.html', 'utf8', function(err, data) {
		res.end(data);
	});
});
*/

/* ************************************************************************** */

/* SERVER */

var server = app.listen(4331, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log("Meels app listening @ http://%s:%s", host, port);

});
