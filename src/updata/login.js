const lfpmysql = require('./mysql.js')

const login = async (req, res, post) => {
  let data;
  try {
    await lfpmysql.connectmysql()
    let username = post.username
    let sql = `SELECT * FROM user WHERE username='${username}'`
    data = await lfpmysql.queryData(sql)
    console.log(data)
    if(data[0].password != post.password) {
      data.length = 0
    }
    await lfpmysql.END()
  } catch (e) {
    console.log("抛出错误")
  }
  return {
    success: !!data.length,
    message: !!data.length ? '登录成功' : '登录失败',
    data: data[0],
    prompt: {},
  }
}
let data, success, message;
const register = async (req, res, post) => {
  try {
    await lfpmysql.connectmysql()
    let username = post.username
    let sql = `SELECT * FROM user WHERE username='${username}'`
    data = await lfpmysql.queryData(sql)
    if (data.length) {
      success = false
      message = '该用户已存在'
    } else {
      sql = `insert into user (username, password) values ('${post.username}', '${post.password}')`
      data = await lfpmysql.queryData(sql)
      success = true
      message = '注册成功'
    }
    await lfpmysql.END()
  } catch (e) {
    console.log("抛出错误")
    success = false
    message = '注册失败'
  } finally {
    return {
      success: success,
      message: message,
      data: {},
      prompt: {},
    }
  }
}

module.exports = {
  login,
  register
}