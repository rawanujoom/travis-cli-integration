const staticPath = __dirname + '/client/dist';
const bodyParser = require('body-parser');
const express = require('express');
var app = express();

app
    .use(bodyParser.json())
    /*Register Static content path*/
    .use(express.static(staticPath))
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
            message: err.message,
            error: {}
        });
    })
    /*Default route*/
    .use((req, res)=>{
      res.sendFile(staticPath + '/index.html');
    });

module.exports = app;