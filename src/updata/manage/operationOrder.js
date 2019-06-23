const lfpmysql = require('../mysql')

const responseInfo = (data = null, success = null, message = null, prompt = null) => {
  return {
    data,
    success,
    message,
    prompt
  }
}

let data = {}, success, message, prompt
const allOrderList = async function () {
  try {
    await lfpmysql.connectmysql()
    const sql = 'select * from orderFrom'
    data = await lfpmysql.queryData(sql)
    success = true
    message = '获取订单列表成功'
    await lfpmysql.END()
  } catch (e) {
    console.log("获取订单列表出错")
    message = '获取订单列表出错',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}
const getOrderDetails = async function (req) {
  try {
    data = {}
    await lfpmysql.connectmysql()
    const sql = `select * from orderMap where orderId = ${req.params.id}`
    let orderDetails = await lfpmysql.queryData(sql)
    const orderSql = `select * from orderFrom where orderId = ${req.params.id}`
    let order = await lfpmysql.queryData(orderSql)
    data.orderDetails = orderDetails
    data = Object.assign({}, data, order[0])
    success = true
    message = '获取订单详细信息成功'
    await lfpmysql.END()
  } catch (e) {
    console.log("获取订单详细信息出错")
    message = '获取订单详细信息出错',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}
const editOrderInfo = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    const sql = `update orderFrom set orderStatus = ${post.orderStatus}, tableNumber = '${post.tableNumber}', money = '${post.money}' where orderId = '${req.params.id}'`
    console.log(sql)
    await lfpmysql.queryData(sql)
    success = true
    message = '修改订单成功'
    await lfpmysql.END()
  } catch (e) {
    message = '修改订单失败',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}
const deleteOrder = async function (req) {
  try {
    await lfpmysql.connectmysql()
    const sql = `delete from orderFrom where orderId = '${req.params.id}'`
    await lfpmysql.queryData(sql)
    success = true
    message = '删除订单成功'
    await lfpmysql.END()
  } catch (e) {
    message = '删除订单失败',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}
module.exports = {
  allOrderList,
  getOrderDetails,
  editOrderInfo,
  deleteOrder
}