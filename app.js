/*
 * @Author: 张驰阳
 * @Date:   2016-12-13 15:32:37
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2016-12-13 17:37:41
 */

'use strict';

var express = require("express");
var app = express();
var birds = require("./birds");

var cb0 = function(req, res, next) {
    console.log("CB0");
    res.send("cb0");
    next();
}
var cb1 = function(req, res, next) {
    console.log("CB1");
    // res.send("cb1");
    next();
}
app.use(function(req, res, next) {
    console.log("Time:", Date.now());
    next();
})
app.use("/user/:id", function(req, res, next) {
    console.log(req.params.id);
    if (req.params.id == 0) {
        console.log(1);
        next("route");
    } else {
        console.log(2);
        next();
    }
}, function(req, res, next) {
    console.log("error")
    res.send("params error");
});
// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id', function(req, res, next) {
    console.log("good");
});
app.get("/cb", [cb0, cb1]);
app.get("/", function(req, res) {
    res.send("nihao shijiebei");
});
app.get("/dl", function(req, res, next) {
    res.send("download banner1.jpg");
    res.download("static/img/img/banner1.jpg");
})

app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    })
    // app.use(express.static("static"));
app.use("/app", express.static("static/img/img"));
app.use("/app", express.static("static/img/head"));
app.use("/app", express.static("static/css"));
app.use("/birds", birds);
var server = app.listen("3000", function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("listening at http://", host, port)
})
