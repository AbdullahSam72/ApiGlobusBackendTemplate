const express = require("express");
const glErrors = require("../CommonUtil/glErrors");
const apiLogin = require("../GLCM/GLCM1001");
const apiMenu = require("../GLCM/GLCM1003");
const apiAccessRight = require("../GLCM/GLCM1004");

require("express-async-errors");
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/login", apiLogin);
  app.use("/api/Menu", apiMenu);
  app.use("/api/AccessRight", apiAccessRight);
  app.use(glErrors);
};
