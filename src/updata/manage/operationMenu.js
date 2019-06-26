const lfpmysql = require('../mysql.js')

const responseInfo = (data, success, message, prompt) => {
  return {
    data,
    success,
    message,
    prompt
  }
}

const initInfo = () => {
  data = {}
  message = ''
  prompt = {}
}

let data, success, message, prompt
const viewMenu = async function () {
  let tempData
  initInfo()
  try {
    await lfpmysql.connectmysql()
    let sql = 'select * from Commodity'
    tempData = await lfpmysql.queryData(sql)
    for (let i = 0; i < tempData.length; i++) {
      sql = `select * from Car where carId = ${tempData[i].carId}`
      console.log(sql)
      let temp = (await lfpmysql.queryData(sql))[0]
      tempData[i] = Object.assign({}, tempData[i], temp)
      console.log(temp)
    }
    data = tempData
    success = true
    message = "获取汽车信息成功"
    await lfpmysql.END()
  } catch (e) {
    console.log('获取汽车信息出错')
    success = false
    message = "获取汽车信息失败"
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
    initInfo()
    await lfpmysql.connectmysql()
    const sql = `insert into Commodity (carId, price, stock) VALUES ('${post.carId}', '${post.price}', '${post.stock}')`
    console.log(sql)
    await lfpmysql.queryData(sql)
    success = true
    message = "添加商品成功"
    await lfpmysql.END()
  } catch (e) {
    console.log("添加商品成功")
    success = false
    message = "添加商品失败"
  } finally {
    prompt = {
      name: "名称",
      price: "价格",
      stock: "库存"
    }
    return responseInfo(data, success, message, prompt)
  }
}

const editDish = async function (req, post) {
  try {
    initInfo()
    await lfpmysql.connectmysql()
    let sql = `select carId from Commodity where commodityId = ${req.params.id}`
    console.log(sql)
    let carId = await lfpmysql.queryData(sql)
    console.log(carId[0].carId)
    sql = `update Commodity set price = '${post.price}', stock = '${post.stock}'  where commodityId = '${req.params.id}';`
    console.log(sql)
    sql += `update Car set carBrand = '${post.carBrand}', carName = '${post.carName}', energy = '${post.energy}', displacement = '${post.displacement}'  where carId = '${carId[0].carId}'`
    console.log(sql)
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
    initInfo()
    await lfpmysql.connectmysql()
    const sql = `delete from Commodity where CommodityId = '${req.params.id}'`
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

const allCar = async function (req) {
  try {
    initInfo()
    await lfpmysql.connectmysql()
    const sql = `select * from Car`
    data = await lfpmysql.queryData(sql)
    success = true
    message = '获取汽车列表成功'
    await lfpmysql.END()
  } catch (e) {
    message = '获取汽车列表失败',
    success = false
  }
  return responseInfo(data, success, message, prompt)
}


module.exports = {
  viewMenu,
  addDish,
  editDish,
  deleteDish,
  allCar
}