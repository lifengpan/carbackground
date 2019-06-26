const user_mune = require("../updata/user/viewMenu")
const user_order = require("../updata/user/order")
const user_info = require("../updata/user/UserInfo")

const menuList = async (req, res) => {
  const data = await user_mune.viewMenu()
  res.set("content-type","application/json;charset = utf-8");
  res.send(JSON.stringify(data))
}

const createOrder = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await user_order.createOrder(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

const orderAddDish = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await user_order.orderAddDish(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

const uniqueOrderList = async (req, res) => {
  const data = await user_order.uniqueOrderList(req)
  res.set("content-type","application/json;charset = utf-8");
  res.send(JSON.stringify(data))
}

const confirmGoods = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await user_order.confirmGoods(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

const userRefund = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await user_info.userRefund(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

const eidtInfo = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await user_info.eidtInfo(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

const getPersonalInfo = async (req, res) => {
  const data = await user_info.getPersonalInfo(req)
  res.set("content-type","application/json;charset = utf-8");
  res.send(JSON.stringify(data))
}

const getCarDetails = async (req, res) => {
  const data = await user_mune.getCarDetails(req)
  res.set("content-type", "application/json;charset = utf-8")
  res.send(JSON.stringify(data))
}

module.exports = {
  menuList,
  createOrder,
  orderAddDish,
  uniqueOrderList,
  confirmGoods,
  userRefund,
  eidtInfo,
  getPersonalInfo,
  getCarDetails
}