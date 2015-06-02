module.exports = function(app, Users) {
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

        // create a todo, information comes from AJAX request from Angular
        Users.create({
            name: req.body.name,
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
}