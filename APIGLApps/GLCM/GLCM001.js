const express = require("express");
const objJwtToken = require("jsonwebtoken");
const objCongig = require("../CommonConfig/config.json");
//const objJwtToken = require("../CommonUtil/auth");
const objEnCrpt = require("../CommonUtil/hash");

const dbUtil = require("../DBCall/DBUtil");
const glTryCach = require("../CommonUtil/GLtryCatch");
const router = express.Router();

router.post("/", (req, res) => {
  const strParaMeter = { USER_ID: req.body.id, PASS_CD: req.body.password };
  console.log(strParaMeter);

  const resultCall = new Promise((resolve, reject) => {
    resolve(dbUtil.dbUtil_Temp.Select_SP("SP_GLCM1001", strParaMeter));
  });

  console.log("Sam", "hih");
  resultCall.then((result) => {
    console.log("Result from DB ", result);

    const dataResult = objEnCrpt.GlEncrypt(result);
    const tokenId = objJwtToken.sign(
      { id: dataResult.USER_ID },
      objCongig.glJWTPriveteKey
    );
    console.log(dataResult);
    res.header("x-gl-Auth-Token", tokenId).send(result); //
  });
});

module.exports = router;
