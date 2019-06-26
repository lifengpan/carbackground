const express = require("express")
var router = express.Router();

const admin = require("../responsefunc/admin")

const setresponseHeader  = (req,res,next)=>{
  res.set("content-type","application/json;charset = utf-8");
  next();
}
router.use(setresponseHeader);

router.get("/get/userList", admin.userList)
router.get("/:username/details", admin.userDetails)
router.put("/edit/:userId/Info", admin.editUserInfo)
router.delete("/delete/:userId", admin.deleteUser)

router.get("/menuList", admin.menuList)
router.put("/addDishes", admin.addDish)
router.put("/edit/dish/:id", admin.editDish)
router.delete("/delete/dish/:id", admin.deleteDish)
router.get("/allCar", admin.allCar)

router.get("/allorderList", admin.allOrderList)
router.get("/:id/orderDetails", admin.getOrderDetails)
router.put("/edit/:id/orderInfo", admin.editOrderInfo)
router.delete("/delete/:id/order", admin.deleteOrder)
router.put("/refundSales/:id", admin.refundSales)

router.get("/:id/carDetails", admin.getCarDetails)
router.put("/edit/:id/carInfo", admin.editCarInfo)
router.delete("/delete/:id/car", admin.deleteCar)
router.post("/addCar", admin.addCar)


module.exports = router;