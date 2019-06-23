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
    console.log('获取菜单出错')
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

const addDish = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    const sql = `insert into menu (name, price) VALUES ('${post.name}', '${post.price}')`
    await lfpmysql.queryData(sql)
    success = true
    message = "添加菜成功"
    await lfpmysql.END()
  } catch (e) {
    console.log("添加菜失败")
    success = false
    message = "添加菜失败"
  } finally {
    prompt = {
      name: "菜名",
      price: "价格"
    }
    return responseInfo(data, success, message, prompt)
  }
}

const editDish = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    const sql = `update menu set name = '${post.name}', price = '${post.price}'  where dishesId = '${req.params.id}'`
    await lfpmysql.queryData(sql)
    success = true
    message = '修改成功'
    await lfpmysql.END()
  } catch (e) {
    message = '修改失败',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}

const deleteDish = async function (req) {
  try {
    await lfpmysql.connectmysql()
    const sql = `delete from menu where dishesId = '${req.params.id}'`
    await lfpmysql.queryData(sql)
    success = true
    message = '删除成功'
    await lfpmysql.END()
  } catch (e) {
    message = '删除失败',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}


module.exports = {
  viewMenu,
  addDish,
  editDish,
  deleteDish
}