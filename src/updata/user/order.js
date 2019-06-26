const lfpmysql = require('../mysql.js')

const responseInfo = (data, success, message, prompt) => {
  return {
    data,
    success,
    message,
    prompt
  }
}

const transformData = () => {
  now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let day = now.getDate()
  let hours = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

let data, success, message, prompt
const createOrder = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    let date = transformData()
    let sql = `INSERT INTO Carorder (userId, createTime, orderStatus, adress) VALUES (${post.userId}, '${date}', '已付款', '${post.adress}');`
    await lfpmysql.queryData(sql)
    sql = `select orderId from Carorder where createtime = '${date}'`
    const info = await lfpmysql.queryData(sql)
    data = info[0]
    await orderAddDish(req, post, info[0].orderId)
    success = true
    message = "创建订单成功"
    await lfpmysql.END()
  } catch (e) {
    console.log('创建订单失败')
    success = false
    message = "创建订单失败"
  } finally {
    prompt = {
      orderId: "订单Id",
    }
    return responseInfo(data, success, message, prompt)
  }
}

const orderAddDish = async function (req, post, orderId) {
  try {
    let sql = ''
    let sqlsum = ''
    let arr = post.dishList
    console.log(arr)
    console.log('------------')
    console.log(post.dishList)
    let totalPrice = 0
    for (let i=0; i < arr.length; i++ ) {
      sql = `select price from Commodity where commodityId = ${arr[i].id}`
      let dishDetails = await lfpmysql.queryData(sql)
      totalPrice  = totalPrice + dishDetails[0].price
      sqlsum = sqlsum + `insert into orderAndcommodityId (orderId, commodityId, unitPrice, number) values (${orderId}, ${arr[i].id}, ${dishDetails[0].price}, ${arr[i].number});`
    }
    sqlsum = sqlsum + `update Carorder set totalPrice = '${totalPrice}' where orderId = ${orderId}`
    await lfpmysql.queryData(sqlsum)
    success = true
    message = "添加菜入订单成功"
  } catch (e) {
    console.log('添加菜入订单失败')
    success = false
    message = "添加菜入订单失败"
  } finally {
    prompt = {
      orderId: "订单Id",
    }
    return responseInfo(data, success, message, prompt)
  }
}

const uniqueOrderList = async function (req) {
  try {
    data = []
    await lfpmysql.connectmysql()
    let sql
    sql = `select * from Carorder where userId = '${req.params.userId}'`
    console.log(sql)
    let orderList = await lfpmysql.queryData(sql)
    for (let i=0; i < orderList.length; i++ ) {
      let detail = await orderDetails(req, orderList[i].orderId)
      let temp = {
        orderId: orderList[i].orderId,
        createTime: orderList[i].createTime,
        orderStatus: orderList[i].orderStatus,
        refundInstructions: orderList[i].refundInstructions,
        refundReply: orderList[i].refundReply,
        totalPrice: orderList[i].totalPrice,
        orderDetails: detail
      }
      data.push(temp)
    }
    success = true
    message = "获取订单列表成功"
    await lfpmysql.END()
  } catch (e) {
    console.log('创建订单失败')
    success = false
    message = "获取订单列表失败"
  } finally {
    prompt = {
      createTime: '创建时间',
      dishDetails: '已点菜单详情'
    }
    return responseInfo(data, success, message, prompt)
  }
}

const confirmGoods = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    const sql = `update Carorder set orderStatus = '已收货' where orderId = '${req.params.orderId}'`
    console.log(sql)
    await lfpmysql.queryData(sql)
    success = true
    message = '收货成功'
    await lfpmysql.END()
  } catch (e) {
    message = '收货失败',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}

const userRefund = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    const sql = `update Carorder set orderStatus = '退款中', refundInstructions = '${post.refundInstructions}' where orderId = '${req.params.orderId}'`
    console.log(sql)
    await lfpmysql.queryData(sql)
    success = true
    message = '退款申请提交成功'
    await lfpmysql.END()
  } catch (e) {
    message = '退款申请提交失败',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}

const orderDetails = async function (req, orderId) {
  let orderDetail, Commodity, Car, orderitem = [], temp
  try {
    sql = `select * from orderAndcommodityId where orderId = ${orderId}`
    orderDetail = await lfpmysql.queryData(sql)
    for (let i=0; i<orderDetail.length; i++) {
      sql = `select * from Commodity where commodityId = ${orderDetail[i].commodityId}`
      Commodity = await lfpmysql.queryData(sql)
      sql = `select * from Car where carId = ${Commodity[0].carId}`
      Car = await lfpmysql.queryData(sql)
      temp = Object.assign({}, Car[0], Commodity[0], orderDetail[i])
      orderitem.push(temp)
    }
  } catch (e) {
    console.log('获取订单详情失败')
    message = '获取订单详情失败'
    success = false
  }
  return orderitem
}

module.exports = {
  createOrder,
  orderAddDish,
  uniqueOrderList,
  confirmGoods,
  userRefund
}