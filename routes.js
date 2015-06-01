module.exports = function(app) {
    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/users', function(req, res) {

        // use mongoose to get all todos in the database
        user.User.find(function(err, listUsers) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(listUsers); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/users', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        User.create({
            name: req.body.name,
            done: false
        }, function(err, listUsers) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            User.find(function(err, listUsers) {
                if (err)
                    res.send(err)
                res.json(listUsers);
            });
        });

    });

    // delete a todo
    app.delete('/api/users/:user_id', function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, luser) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            User.find(function(err, listUsers) {
                if (err)
                    res.send(err)
                res.json(listUsers);
            });
        });
    });
}