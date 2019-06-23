const express = require("express")
var router = express.Router();

const user = require("../responsefunc/user")

const setresponseHeader  = (req,res,next)=>{
  res.set("content-type","application/json;charset = utf-8");
  next();
}
router.use(setresponseHeader);

router.get("/menuList", user.menuList)
router.post("/createOrder", user.createOrder)
router.put("/createOrder/:id/addDish", user.orderAddDish)
router.get("/orderList/:username", user.uniqueOrderList)

module.exports = router;