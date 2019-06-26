const lfpmysql = require('./mysql.js')

let data, success, message, prompt

const responseInfo = (data, success, message, prompt) => {
  return {
    data,
    success,
    message,
    prompt
  }
}

const initResInfo = () => {
  data = {},
  success = false,
  message = {},
  prompt = {}
}

const login = async (req, res, post) => {
  initResInfo()
  try {
    await lfpmysql.connectmysql()
    let username = post.username
    let sql = `SELECT * FROM carUser WHERE username='${username}'`
    data = await lfpmysql.queryData(sql)
    if (data.length) {
      message = data[0].password != post.password ? '密码错误' : '密码正确'
      success = (data[0].password === post.password)
      console.log(success)
    } else {
      success = false
      message = '用户名不存在'
    }
    await lfpmysql.END()
  } catch (e) {
    console.log("抛出错误")
  }
  return responseInfo(data[0], success, message, prompt)
}

const register = async (req, res, post) => {
  initResInfo()
  try {
    await lfpmysql.connectmysql()
    let username = post.username
    let sql = `SELECT * FROM carUser WHERE username='${username}'`
    console.log(sql)
    data = await lfpmysql.queryData(sql)
    if (data.length) {
      success = false
      message = '用户名已存在'
    } else {
      sql = `insert into carUser (username, password, isManage) values ('${post.username}', '${post.password}', 0)`
      console.log(sql)
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
    return responseInfo(data, success, message, prompt)
  }
}

module.exports = {
  login,
  register
}