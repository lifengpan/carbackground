let mysql = require('mysql')
let config = require('./config.js')

let connection = mysql.createConnection(config)

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
})

let sql = 'SELECT * FROM user;'

connection.query(sql, function(err,reust) {
  if(err) {
    console.log("出错")
  } else {
    console.log(reust)
  }
})

connection.end()