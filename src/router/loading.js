const express = require("express")
var router = express.Router();

const loading = require("../responsefunc/loading")

const setresponseHeader  = (req,res,next)=>{
  res.set("content-type","application/json;charset = utf-8");
  next();
}
router.use(setresponseHeader);

router.post("/Login", loading.loading)
router.post("/Register", loading.register)

module.exports = router;