import express = require("express");
import path = require("path");
import logger = require("morgan");
import bodyParser = require("body-parser");
import cookieParser = require('cookie-parser');


let app = express();


if (app.get("env") === "development") {
    app.use(logger("dev"));
}


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Routes
/*
app.use("/", require("./routes/uploads"));
app.use("/sculpteo", require("./routes/sculpteo"));
*/



// Client

var distDir = path.join(__dirname, "..", "..", "client", "dist")
app.use('/', express.static(distDir));
app.get('/*', function (req, res) {
    res.sendFile(path.join(distDir + '/index.html'));
});



// error handlers

app.use(function(req, res, next) {
    let err = <any>new Error("Not Found");
    err["status"] = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        //console.log(err.stack);

        console.log(err.message);
        console.log(err);
        
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.write(JSON.stringify({
            message: err.message,
            error: err
        }));
        res.end();
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.write(JSON.stringify({
        message: err.message,
        error: err
    }));
    res.end();
});

export = app;