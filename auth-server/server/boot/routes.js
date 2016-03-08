/**
 * author <agung.julisman@yahoo.com>
 * overwrite route
 */

var _ = require('underscore');

module.exports = function(app) {
    /*load model user*/
    var User = app.models.RlUsers;

    /*landing page*/
    app.get('/', function(req, res) {
        res.send({ status :  'api gateway is running' });
    });

    /**
     * Login a user by with the given `token`.
     * require
     *  -email
     *  -password
     */
    app.post('/auth', function(req, res) {
        if(!_.isEmpty(req.body)){
            User.login({
                email: req.body.email,
                password: req.body.password
            }, 'user', function(err, token) {
                if (err) {
                    return res.status(401).send({ message: err.message });
                }
                res.send({ token:  token.id });

            });
        }else{
            res.status(400).send({ message: 'body is empty' });
        }
    });

    /**
     * Logout a user by header token.
     * require
     *  -token
     */
    app.post('/logout', function(req, res, next) {
        if (!req.accessToken) return res.sendStatus(401);
        User.logout(req.accessToken.id, function(err) {
            if (err) return res.status(401).send({ message: err.message });
            res.send();
        });
    });


};
