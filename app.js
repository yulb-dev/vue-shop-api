var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//引入路由模块
var router = require("./router");
//解决跨域请求失败问题
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
//引入字符串模板快
app.engine("html", require("express-art-template"));
app.set("views", path.join(__dirname, "./views/"));

//规定打开
// app.use("/public/", express.static(path.join(__dirname, "./public/")));
app.use(
  "/node_modules/",
  express.static(path.join(__dirname, "./node_modules/"))
);
//配置body-parsee 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//登录状态 session 一定配置到 router 之前
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

//挂载路由
app.use(router);
app.listen(3000, function () {
  console.log("running...");
});
