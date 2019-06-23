let mysql = require('mysql')
let config = require('./config.js')

let connection

function connectmysql () {
  connection = mysql.createConnection(config)
  return new Promise(function (resolve, reject) {
    connection.connect(function (err) {
      if (err) {
        console.log("连接失败")
        console.log(err)
        reject(err);
      } else {
        console.log('连接成功')
        resolve();
      }
    })
  })
}

const queryData = function (sql) {
  return new Promise(function (resolve, reject) {
    connection.query(sql, function(err,reust) {
      if(err) {
        console.log("出错")
        reject(err)
      } else {
        resolve(reust)
      }
    })
  })
}

const END = function () {
  return new Promise(function (resolve, reject) {
    connection.end(function(err) {
      if(err) {
        console.log("关闭失败")
        reject(err)
      } else {
        console.log('关闭成功')
        resolve()
      }
    })
  })
}

module.exports = {
  connectmysql,
  queryData,
  END,
}