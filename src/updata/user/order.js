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
    console.log(post.username)
    console.log(post.tableNumber)
    let sql = `INSERT INTO orderFrom (createUser, createtime, tableNumber, orderStatus) VALUES ('${post.username}', '${date}', '${post.tableNumber}', 0);`
    console.log(sql)
    await lfpmysql.queryData(sql)
    console.log('guo')
    sql = `select orderId from orderFrom where createtime = '${date}'`
    const info = await lfpmysql.queryData(sql)
    data = info[0]
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

const orderAddDish = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    let sql = ''
    let sqlsum = ''
    let arr = post.dish
    console.log(arr)
    for (let i=0; i < arr.length; i++ ) {
      sql = `select name, price from menu where dishesId = ${arr[i].id};`
      let dishDetails = await lfpmysql.queryData(sql)
      sqlsum = sqlsum + `insert into orderMap (orderId, name, unitPrice, number) values (${req.params.id}, '${dishDetails[0].name}', ${dishDetails[0].price}, ${arr[i].number});`
    }
    console.log(sqlsum)
    await lfpmysql.queryData(sqlsum)
    success = true
    message = "添加菜入订单成功"
    await lfpmysql.END()
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
    sql = `select orderId, createTime, orderStatus from orderFrom where createUser = '${req.params.username}'`
    let orderList = await lfpmysql.queryData(sql)
    for (let i=0; i < orderList.length; i++ ) {
      sql = `select * from orderMap where orderId = ${orderList[i].orderId}`
      let dishDetails = await lfpmysql.queryData(sql)
      let temp = {
        createTime: orderList[i].createTime,
        orderStatus: orderList[i].orderStatus,
        dishDetails: dishDetails
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

module.exports = {
  createOrder,
  orderAddDish,
  uniqueOrderList
}