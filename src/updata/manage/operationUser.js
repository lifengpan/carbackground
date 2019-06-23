const lfpmysql = require('../mysql')

const responseInfo = (data = null, success = null, message = null, prompt = null) => {
  return {
    data,
    success,
    message,
    prompt
  }
}

let data, success, message, prompt
const getUserList = async function () {
  try {
    await lfpmysql.connectmysql()
    const sql = 'select * from user'
    data = await lfpmysql.queryData(sql)
    success = true
    message = '获取用户列表成功'
    await lfpmysql.END()
  } catch (e) {
    console.log("获取用户列表出错")
    message = '获取用户列表出错',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}
const getUserDetails = async function (req) {
  try {
    await lfpmysql.connectmysql()
    const sql = `select * from user where username = ${req.params.username}`
    data = await lfpmysql.queryData(sql)
    success = true
    message = '获取用户详细信息成功'
    await lfpmysql.END()
  } catch (e) {
    console.log("获取用户详细信息出错")
    message = '获取用户详细信息出错',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}
const editUserInfo = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    const sql = `update user set password = '${post.password}', isManage = '${post.isManage}'  where username = '${req.params.username}'`
    await lfpmysql.queryData(sql)
    success = true
    message = '修改信息成功'
    await lfpmysql.END()
  } catch (e) {
    message = '修改信息失败',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}
const deleteUser = async function (req) {
  try {
    await lfpmysql.connectmysql()
    const sql = `delete from user where username = '${req.params.username}'`
    await lfpmysql.queryData(sql)
    success = true
    message = '删除用户成功'
    await lfpmysql.END()
  } catch (e) {
    message = '删除用户失败',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}
module.exports = {
  getUserList,
  getUserDetails,
  editUserInfo,
  deleteUser
}