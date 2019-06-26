const lfpmysql = require('../mysql.js')

const responseInfo = (data, success, message, prompt) => {
  return {
    data,
    success,
    message,
    prompt
  }
}

let data, success, message, prompt
const eidtInfo = async function (req, post) {
  let tempData
  try {
    await lfpmysql.connectmysql()
    let sql = `update carUser set firstname = '${post.firstName}', sex = '${post.sex}', telephone = '${post.telephone}', address = '${post.address}' where userId = '${req.params.id}'`
    console.log(sql)
    tempData = await lfpmysql.queryData(sql)
    success = true
    message = "修改信息成功"
    await lfpmysql.END()
  } catch (e) {
    console.log('修改信息出错')
    success = false
    message = "修改信息失败"
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}

const getPersonalInfo = async function (req) {
  let tempData
  try {
    await lfpmysql.connectmysql()
    let sql = `select * from carUser where userId = '${req.params.id}'`
    tempData = await lfpmysql.queryData(sql)
    data = tempData[0]
    success = true
    message = "获取个人信息成功"
    await lfpmysql.END()
  } catch (e) {
    console.log('获取个人信息失败')
    success = false
    message = "获取个人信息失败"
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}

module.exports = {
  eidtInfo,
  getPersonalInfo
}