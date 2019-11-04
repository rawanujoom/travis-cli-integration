var config = require('./config');
var app = require('./app');

/*Start server*/
var server = app.listen(process.env.PORT || config.port, ()=>{
    console.log('listening on port: ' + config.port);
});

module.exports = server;