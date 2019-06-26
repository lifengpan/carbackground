const admin_oprationUser = require('../updata/manage/operationUser')
const admin_opration_menu = require('../updata/manage/operationMenu')
const admin_opration_order = require('../updata/manage/operationOrder')
const admin_opration_car = require('../updata/manage/operationCar')

const userList = async (req, res) => {
  const data = await admin_oprationUser.getUserList()
  res.set("content-type", "application/json;charset = utf-8")
  res.send(JSON.stringify(data))
}

const userDetails = async (req, res) => {
  const data = await admin_oprationUser.getUserDetails(req)
  res.set("content-type", "application/json;charset = utf-8")
  res.send(JSON.stringify(data))
}

const editUserInfo = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await admin_oprationUser.editUserInfo(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

const deleteUser = async (req, res) => {
  const data = await admin_oprationUser.deleteUser(req)
  res.set("content-type", "application/json;charset = utf-8")
  res.send(JSON.stringify(data))
}

const menuList = async (req, res) => {
  const data = await admin_opration_menu.viewMenu()
  res.set("content-type","application/json;charset = utf-8");
  res.send(JSON.stringify(data))
}

const addDish = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await admin_opration_menu.addDish(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

const editDish = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await admin_opration_menu.editDish(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

const deleteDish = async (req, res) => {
  const data = await admin_opration_menu.deleteDish(req)
  res.set("content-type", "application/json;charset = utf-8")
  res.send(JSON.stringify(data))
}

const allOrderList = async (req, res) => {
  const data = await admin_opration_order.allOrderList()
  res.set("content-type", "application/json;charset = utf-8")
  res.send(JSON.stringify(data))
}

const getOrderDetails = async (req, res) => {
  const data = await admin_opration_order.getOrderDetails(req)
  res.set("content-type", "application/json;charset = utf-8")
  res.send(JSON.stringify(data))
}

const editOrderInfo = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await admin_opration_order.editOrderInfo(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

const deleteOrder = async (req, res) => {
  const data = await admin_opration_order.deleteOrder(req)
  res.set("content-type", "application/json;charset = utf-8")
  res.send(JSON.stringify(data))
}

const refundSales = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await admin_opration_order.refundSales(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

const allCar = async (req, res) => {
  const data = await admin_opration_menu.allCar()
  res.set("content-type","application/json;charset = utf-8");
  res.send(JSON.stringify(data))
}

const getCarDetails = async (req, res) => {
  const data = await admin_opration_car.getCarDetails(req)
  res.set("content-type", "application/json;charset = utf-8")
  res.send(JSON.stringify(data))
}
const editCarInfo = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await admin_opration_car.editCarInfo(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

const deleteCar = async (req, res) => {
  const data = await admin_opration_car.deleteCar(req)
  res.set("content-type", "application/json;charset = utf-8")
  res.send(JSON.stringify(data))
}

const addCar = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    const data = await admin_opration_car.addCar(req, post)
    res.set("content-type","application/json;charset = utf-8");
    res.send(JSON.stringify(data))
  })
}

module.exports = {
  userList,
  userDetails,
  editUserInfo,
  deleteUser,
  menuList,
  addDish,
  editDish,
  deleteDish,
  allOrderList,
  getOrderDetails,
  editOrderInfo,
  deleteOrder,
  refundSales,
  allCar,
  getCarDetails,
  editCarInfo,
  deleteCar,
  addCar
}