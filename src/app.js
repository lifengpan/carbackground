const express = require("express")
const homeRouter = require("./router/loading")
const user = require("./router/user")
const admin = require("./router/admin")

var app = express()

app.use('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
//res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
  // res.header('Access-Control-Expose-Headers', 'Authorization');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200) // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
  }
  else {
    next();
  }
});

app.use('/api', homeRouter)
app.use('/api/user', user)
app.use('/api/manager', admin)
app.use(function(req, res, next) {
  const temp = {
    data: null,
    message: "此路由不存在",
    success: false
  }
  res.status(200).send(JSON.stringify(temp));
});
module.exports = app