/**
 * author <agung.julisman@yahoo.com>
 * overwrite route
 */
module.exports = function(server) {

    var router = server.loopback.Router();
    router.get('/', server.loopback.status());
    server.use(router);

};
