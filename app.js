const staticPath = __dirname + '/client/dist';
const bodyParser = require('body-parser');
const express = require('express');
var app = express();

app
    /*Register Static content path*/
    .use(express.static(staticPath))

    .use(bodyParser.json({limit: '50mb'}))
    .use(bodyParser.urlencoded({limit: '50mb', extended: true}))
    /*register api routers*/
    .use('/hotel', require('./routes/hotel'))
    /*catch 404*/
    .use((req, res, next)=> {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    })
    /*Error Handling */
    .use((err, req, res, next)=> {
        if(err.status != 404) {
            console.error(err);
        }
        res.status(err.status || 500).json({
            error: {}
        });
    })
    /*Default route*/
    .use((req, res)=>{
      res.sendFile(staticPath + '/index.html');
    });

module.exports = app;