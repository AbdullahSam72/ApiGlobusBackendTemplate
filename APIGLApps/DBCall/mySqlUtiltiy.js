const express = require("express");
const sql = require("mysql");
var config = require("../DBConfig/mySQLConfig");

async function Select_Query(strSqlSelectQuery) {
  try {
    console.log(config.db.host + " :" + config.db.database);
    let pool = await sql.connect(config.db);
    let resultSet = await pool.request().query(strSqlSelectQuery);
    return resultSet.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function Select_SP(strSP_name, strParameter) {
  try {
    //Query Data only
    console.log("strSP_name:" + strSP_name);
    console.log(config.db.host + " :" + config.db.database);
    console.log("Parameter:" + strParameter);

    const keyTemp = [];
    const sqlSpPara = [];
    const keyValue = [];
    if (strParameter != "") {
      let entries = Object.entries(strParameter).forEach((entry) => {
        const [key, value] = entry;
        console.log("Key :" + key);
        console.log("Values :" + value);
        sqlSpPara.push("?");
        keyTemp.push("i_" + key);
        keyValue.push(value);
      });
    }

    console.log("Key Temp :", keyTemp);
    console.log("Key SP Para :", sqlSpPara);
    console.log("Key Value :", keyValue);

    let sqlMainSp = strSP_name;
    if (keyTemp.length > 0) {
      sqlMainSp =
        sqlMainSp + "(" + sqlSpPara.join() + ",@O_ERR_LVL,@O_ERR_CD,@O_ERR_NM)";
    }
    let spPass = "CALL " + sqlMainSp;
    //End
    //Start DB Connection..................
    let pool = sql.createConnection(config.db);
    selectDataResult = () => {
      return new Promise((resolve, reject) => {
        pool.query(spPass, keyValue, (error, result, fields) => {
          if (error) {
            return reject(error);
          }
          console.log("Result final: ", result);

          return resolve(result[0]);
        });
      });
    };
    //End Of DB....................

    //Result Data
    const result = await selectDataResult();
    console.log(result);
    return result;
    ///End Data......................
  } catch (error) {
    console.log(error);
  }
}

async function Save_SP(strSP_name, strParameter) {
  try {
    //Query Data only
    console.log("strSP_name:" + strSP_name);
    console.log(config.db.host + " :" + config.db.database);
    console.log("Parameter:" + strParameter);

    const keyTemp = [];
    const sqlSpPara = [];
    const keyValue = [];
    if (strParameter != "") {
      let entries = Object.entries(strParameter).forEach((entry) => {
        const [key, value] = entry;
        console.log("Key :" + key);
        console.log("Values :" + value);
        sqlSpPara.push("?");
        keyTemp.push("i_" + key);
        keyValue.push(value);
      });
    }

    console.log("Key Temp :", keyTemp);
    console.log("Key SP Para :", sqlSpPara);
    console.log("Key Value :", keyValue);

    let sqlMainSp = strSP_name;
    if (keyTemp.length > 0) {
      sqlMainSp =
        sqlMainSp + "(" + sqlSpPara.join() + ",@O_ERR_LVL,@O_ERR_CD,@O_ERR_NM)";
    }
    let spPass = "CALL " + sqlMainSp;
    //End
    //Start DB Connection..................
    let pool = sql.createConnection(config.db);
    selectDataResult = () => {
      return new Promise((resolve, reject) => {
        pool.query(spPass, keyValue, (error, result, fields) => {
          if (error) {
            return reject(error);
          }
          console.log("Result final: ", result);

          return resolve(result[0]);
        });
      });
    };
    //End Of DB.......................

    //Result Data
    const result = await selectDataResult();
    console.log("Result Final from MySql: ", result);
    return result;
    ///End Data......................
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Select_Query, Select_SP, Save_SP };
