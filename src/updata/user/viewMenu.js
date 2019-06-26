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
  let tempData
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
    carBrand: '品牌',
    carName: '车款信息',
    energy: '能源',
    displacement: '排量'
  }
  return responseInfo(data, success, message, prompt)
}

module.exports = {
  viewMenu,
  getCarDetails
}