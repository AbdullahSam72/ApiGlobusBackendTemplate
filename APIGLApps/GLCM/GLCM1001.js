const express = require("express");
const objJwtToken = require("jsonwebtoken");
const objCongig = require("../CommonConfig/config.json");
//const objJwtToken = require("../CommonUtil/auth");
const objEnCrpt = require("../CommonUtil/hash");

const dbUtil = require("../DBCall/DBUtil");
const glTryCach = require("../CommonUtil/GLtryCatch");
const router = express.Router();
//Login
router.post("/", (req, res) => {
  const strParaMeter = { USER_CD: req.body.id, PASS_CD: req.body.password };
  console.log(strParaMeter);

  const resultCall = new Promise((resolve, reject) => {
    resolve(dbUtil.dbUtil_Temp.Select_SP("SP_GLCM1001", strParaMeter));
  });

  resultCall.then((result) => {
    console.log("Result from DB ", result);
    const dataResult = objEnCrpt.GlEncrypt(result);
    if (result.SUCCESS_YN == "Y") {
      const tokenId = objJwtToken.sign(
        { id: dataResult.USER_CD },
        objCongig.glJWTPriveteKey
      );
      console.log(dataResult);
      res.header("x-gl-Auth-Token", tokenId).send(result); //
    } else {
      res.header("x-gl-Auth-Token", null).send(result); //
    }
  });
});

module.exports = router;
