/**
 * Server config for Muppet mapping app
 */

/* DEPENDENCIES */

var express = require('express');

/* ************************************************************************** */

/* APP SETUP */

var app = express();

app.use( express.static(__dirname + "/../app") );

// re-directs for when page is refreshed
// these need to somehow go to routes on reload if possible?
app.get('/home', function(req, res) {
    res.redirect('/');
});
app.get('/recipes', function(req, res) {
    res.redirect('/');
});
app.get('/recipes/:id', function(req, res) {
    res.redirect('/');
});
app.get('/categories', function(req, res) {
    res.redirect('/');
});
app.get('/newRecipe', function(req, res) {
    res.redirect('/');
});

/* ************************************************************************** */

/* SERVER */

var server = app.listen(4331, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log("Meels app listening @ http://%s:%s", host, port);

});
