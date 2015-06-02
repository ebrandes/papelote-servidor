module.exports = function(app) {

    var Users = require('./model/user.js')
    var bcrypt = require('bcrypt-nodejs');

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/users', function(req, res) {

        // use mongoose to get all todos in the database
        Users.find(function(err, listUsers) {
            console.log(listUsers);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(listUsers); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/user', function(req, res) {
    console.log(req.body);
    console.log(req.param('name'));
        // create a todo, information comes from AJAX request from Angular
        Users.create({
            name: req.body.name,
            password : req.body.password,
            done: false
        }, function(err, listUsers) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Users.find(function(err, listUsers) {
                if (err)
                    res.send(err)
                res.json(listUsers);
            });
        });

    });

    // delete a todo
    app.delete('/api/user/:user_id', function(req, res) {
        Users.remove({
            _id: req.params.user_id
        }, function(err, listUsers) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Users.find(function(err, listUsers) {
                if (err)
                    res.send(err)
                res.json(listUsers);
            });
        });
    });



    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }


}