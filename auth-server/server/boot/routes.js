module.exports = function(app) {

    var User = app.models.RlUsers;

    //login page
    app.get('/', function(req, res) {
        res.send({ status :  'api gateway is running' });
    });

    //log a user in
    app.post('/auth', function(req, res) {

        User.login({
            email: req.body.email,
            password: req.body.password
        }, 'user', function(err, token) {
            if (err) {
                return res.status(401).send({ message: err.message });
            }
            res.send({ token:  token.id });

        });
    });

    //log a user out
    app.post('/logout', function(req, res, next) {
        if (!req.accessToken) return res.sendStatus(401);
        User.logout(req.accessToken.id, function(err) {
            if (err) return next(err);
            res.redirect('/');
        });
    });


};
