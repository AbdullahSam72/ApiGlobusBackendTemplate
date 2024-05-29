const express = require("express");
const dbUtil = require("../DBCall/DBUtil");
const router = express.Router();
/**
 *@swagger
 * /AccessRights:
 *   get:
 *   description: List All Menu
 *   responses:
 *     200:
 *       description: success
 *
 */
router.get("/", (req, res) => {
  console.log("AccessRights");
  const resultCall = new Promise((resolve, reject) => {
    resolve(dbUtil.dbUtil_Temp.Select_SP("Select * FROM TDBC_A003"));
  });

  resultCall.then((result) => {
    console.log("Result", result);
    res.send(result);
  });
});

module.exports = router;
