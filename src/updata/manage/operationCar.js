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


const getCarDetails = async function (req) {
  try {
    await lfpmysql.connectmysql()
    sql = `select * from Car where carId = ${req.params.id}`
    let carDetails = await lfpmysql.queryData(sql)
    data = carDetails[0]
    message = '获取汽车详情成功'
    success = true
    await lfpmysql.END()
  } catch (e) {
    console.log('获取汽车详情失败')
    message = '获取汽车详情失败'
    success = false
  }
  prompt = {
    carName: '型号'
  }
  return responseInfo(data, success, message, prompt)
}

const editCarInfo = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    const sql = `update Car set carBrand = '${post.carBrand}', carName = '${post.carName}', energy = '${post.energy}' where carId = '${req.params.id}'`
    console.log(sql)
    await lfpmysql.queryData(sql)
    success = true
    message = '修改汽车信息成功'
    await lfpmysql.END()
  } catch (e) {
    message = '修改汽车信息失败',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}
const deleteCar = async function (req) {
  try {
    await lfpmysql.connectmysql()
    const sql = `delete from Car where carId = '${req.params.id}'`
    await lfpmysql.queryData(sql)
    success = true
    message = '删除汽车成功'
    await lfpmysql.END()
  } catch (e) {
    message = '删除汽车失败',
    success = false
  } finally {
    prompt = {}
    return responseInfo(data, success, message, prompt)
  }
}

const addCar = async function (req, post) {
  try {
    await lfpmysql.connectmysql()
    console.log(post)
    let sql = `insert into Car (carBrand, carName, energy, displacement ) VALUES ('${post.carBrand}', '${post.carName}', '${post.energy}', '${post.displacement}')`
    console.log(sql)
    await lfpmysql.queryData(sql)
    success = true
    message = "添加汽车成功"
    await lfpmysql.END()
  } catch (e) {
    console.log(sql)
    console.log("添加汽车失败")
    success = false
    message = "添加汽车失败"
  } finally {
    prompt = {
      name: "名称",
      price: "价格",
      stock: "库存"
    }
    return responseInfo(data, success, message, prompt)
  }
}

module.exports = {
  getCarDetails,
  editCarInfo,
  deleteCar,
  addCar
}