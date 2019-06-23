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
const viewMenu = async function () {
  try {
    await lfpmysql.connectmysql()
    const sql = 'select * from menu'
    data = await lfpmysql.queryData(sql)
    success = true
    message = "获取菜单成功"
    await lfpmysql.END()
  } catch (e) {
    console.log('查看菜单出错')
    success = false
    message = "获取菜单失败"
  } finally {
    prompt = {
      name: "菜名",
      price: "价格"
    }
    return responseInfo(data, success, message, prompt)
  }
}

module.exports = {
  viewMenu
}