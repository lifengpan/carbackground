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
    const sql = 'select cu.username,co.refundInstructions,co.refundReply,co.orderId,co.createTime,co.totalPrice,co.adress,co.orderStatus from carUser cu inner join Carorder co on co.userId = cu.userId'
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
  let orderDetail, Commodity, Car, orderitem = [], temp, carOrder
  try {
    await lfpmysql.connectmysql()
    sql = `select CO.userId,CO.createTime,CO.totalPrice,CO.adress, CO.orderStatus, CO.refundInstructions, CO.refundReply, CU.username from Carorder CO inner join carUser CU on CO.orderId = ${req.params.id} and CO.userId = CU.userId`
    console.log(sql)
    carOrder = await lfpmysql.queryData(sql)
    sql = `select * from orderAndcommodityId where orderId = ${req.params.id}`
    console.log(sql)
    orderDetail = await lfpmysql.queryData(sql)
    for (let i=0; i<orderDetail.length; i++) {
      sql = `select * from Commodity where commodityId = ${orderDetail[i].commodityId}`
      console.log(sql)
      Commodity = await lfpmysql.queryData(sql)
      sql = `select * from Car where carId = ${Commodity[0].carId}`
      console.log(sql)
      Car = await lfpmysql.queryData(sql)
      temp = Object.assign({}, Car[0], Commodity[0], orderDetail[i])
      orderitem.push(temp)
    }
    console.log(carOrder)
    carOrder[0].orderDetails = orderitem
    console.log(carOrder)
    data = carOrder[0]
    message = '获取订单详情成功'
    success = true
    await lfpmysql.END()
  } catch (e) {
    console.log('获取订单详情失败')
    message = '获取订单详情失败'
    success = false
  }
  return responseInfo(data, success, message, prompt)
}

const editOrderInfo = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    const sql = `update Carorder set orderStatus = '${post.orderStatus}', totalPrice = '${post.totalPrice}', adress = '${post.adress}' where orderId = '${req.params.id}'`
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
const refundSales = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    const sql = `update Carorder set orderStatus = '${post.orderStatus}', refundReply = '${post.refundReply}' where orderId = '${req.params.id}'`
    console.log(sql)
    await lfpmysql.queryData(sql)
    success = true
    message = '操作订单成功'
    await lfpmysql.END()
  } catch (e) {
    message = '处理失败',
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
  deleteOrder,
  refundSales
}